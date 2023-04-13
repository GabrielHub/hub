const admin = require('firebase-admin');
const _ = require('lodash');
// const mockData = require('../mocks/mockUploadData');
const calculateTwoPointers = require('../utils/calculateTwoPointers');
const calculateFreeThrowsMade = require('../utils/calculateFreeThrows');
const calculateDoubles = require('../utils/calculateDoubles');
const calculateAdvancedOffensiveStats = require('../utils/calculateAdvancedOffensiveStats');
const calculateAdvancedDefensiveStats = require('../utils/calculateAdvancedDefensiveStats');
const constants = require('../constants');

// TODO Error handling. if values return null we should error instead of saving invalid data

// TODO We need to use this until we have more data (league average data)
const DEFAULT_FT_PERC = 0.72;

// ? Used to estimate OREB
const FG_OREB_PERC = 0.22;
const THREEP_OREB_PERC = 0.28;

const getExpectedORebounds = (treb, expected) => {
  const stdDev = treb / 6;
  const randomNumber = stdDev * (2 * Math.random() - 1);
  const finalNumber = Math.min(Math.max(randomNumber + expected, 0), treb);
  return Math.floor(finalNumber);
};

/**
 * @description format then upload player stats
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const uploadStats = async (req, res) => {
  // TODO We can do advanced error handling function here such as
  // * There must be 5 players on each team
  // * Combined stats of each player on each team should add up to respective rawTeamData
  // * Must be a unique position for each player ( 1 - 5 ) to match opposing players

  const { rawTeamData, rawPlayerData, key } = req.body;

  if (!key || typeof key !== 'string' || key !== constants.UPLOAD_KEY) {
    throw Error('Invalid request parameters');
  }

  const formattedTeamData = {};
  const teamReboundData = {};
  const playerReboundData = {};

  // * Calculate oreb for both teams first (estimations) then set basic stats
  Object.keys(rawTeamData).forEach((teamKey) => {
    const teamData = rawTeamData[teamKey];
    const { reb, fgm, fga, threepm, threepa } = teamData;
    const missed3P = threepa - threepm;
    const missed2P = fga - fgm - missed3P;

    const expected = Math.floor(missed3P * THREEP_OREB_PERC + missed2P * FG_OREB_PERC);
    const oreb = getExpectedORebounds(reb, expected);
    const dreb = Math.abs(reb - oreb);

    teamReboundData[teamKey] = {
      dreb,
      oreb
    };
  });

  Object.keys(rawTeamData).forEach((teamKey) => {
    const mp = 100; // * Each games is 20 minutes so total minutes is always 100

    // * Load image recognized stats first
    // * Destructure stats that we'll use for calculations and readability
    const teamData = rawTeamData[teamKey];
    const opponent = teamKey === 1 ? rawTeamData[2] : rawTeamData[1];
    const { pts, reb, tov, fgm, fga, threepm, threepa } = teamData;

    // TODO Figure out a way to do team FTA and FT. They cannot be 0 or it breaks further calculations
    const { twopa, twopm } = calculateTwoPointers(fga, fgm, threepa, threepm);
    // * We cannot get the FTA without knowing FT%, so just calculate FTM
    const ftm = calculateFreeThrowsMade(pts, twopm, threepm) || 1;
    const fta = Math.round(ftm / DEFAULT_FT_PERC) || 1;

    const { twopm: oppTwoPM } = calculateTwoPointers(
      opponent.fga,
      opponent.fgm,
      opponent.threepa,
      opponent.threepm
    );
    const opFTM = calculateFreeThrowsMade(opponent.pts, oppTwoPM, opponent.threepm) || 1;
    const opFTA = Math.round(opFTM / DEFAULT_FT_PERC) || 1;

    const { dreb, oreb } = teamReboundData[teamKey];
    const ORBPerc = oreb / (oreb + (opponent.reb + teamReboundData[opponent.team].oreb));

    // * Possessions
    const scoringPoss = fgm + (1 - (1 - (ftm / fta) ** 2)) * fta * 0.4;
    const totalPoss =
      0.5 *
      (fga +
        0.4 * fta -
        1.07 * (oreb / (oreb + opponent.reb)) * (fga - fgm) +
        tov +
        (opponent.fga +
          0.4 * opFTA -
          1.07 * (0 / (0 + reb)) * (opponent.fga - opponent.fgm) +
          opponent.tov));

    // * ORTG Necessary calculations
    const playPerc = scoringPoss / (fga + fta * 0.4 + tov);
    const ORBWeight =
      ((1 - ORBPerc) * playPerc) / ((1 - ORBPerc) * playPerc + ORBPerc * (1 - playPerc));

    // * Randomly assign offensive rebounds to individual players
    const playersOnTeam = _.shuffle(
      _.filter(rawPlayerData, ({ team, treb }) => {
        // * Sometimes team is a number... sometimes it's a string ugh
        // eslint-disable-next-line eqeqeq
        return team == teamKey && treb > 0;
      })
    );

    playersOnTeam.forEach((player) => {
      playerReboundData[player.name] = {
        oreb: 0
      };
    });

    let orebCount = oreb;

    // * Loop through the players and assign oreb to their reb property
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < playersOnTeam.length && orebCount > 0; i++) {
      const player = playersOnTeam[i];
      const maxReb = player.treb;
      const maxAssign = Math.min(orebCount, maxReb);
      const reboundsAssigned = Math.floor(Math.random() * maxAssign) + 1;
      playerReboundData[player.name].oreb += reboundsAssigned;
      orebCount -= reboundsAssigned; // * decrease oreb by the amount assigned
      // TODO This may not assign all rebounds. But this is an estimation anyway so whatever, this can be improved later
      // TODO Also if there are replicating names (ex. AI Player) they'll end up with the same oboards
    }

    formattedTeamData[teamKey] = {
      ...teamData,
      totalPoss,
      twopm,
      twopa,
      ftm,
      fta,
      dreb,
      oreb,
      ORBPerc,
      scoringPoss,
      playPerc,
      ORBWeight,
      mp
    };
  });

  const formattedPlayerData = rawPlayerData.map((playerData) => {
    let formattedPlayer = {};
    // * Load image recognized stats first
    // * Destructure stats that we'll use for calculations and readability
    const {
      team: teamKey,
      name,
      pts,
      pos,
      treb,
      ast,
      stl,
      blk,
      fgm,
      fga,
      threepm,
      threepa
    } = playerData;

    // * Team data ( might be a waste of space...? )
    const team = formattedTeamData[teamKey];
    const opponent = rawPlayerData.find((player) => player.pos === pos && player.team !== teamKey);

    // * minutes played
    const mp = 20;

    // * Assume there are no offensive rebounds since we have no way of figuring out oreb
    const { oreb = 0 } = playerReboundData[name] || {};
    const dreb = treb - oreb;
    // * Get 2PM to figure out FTM
    const { twopa, twopm } = calculateTwoPointers(fga, fgm, threepa, threepm);
    // * We cannot get the FTA without knowing FT%, so just calculate FTM
    const ftm = calculateFreeThrowsMade(pts, twopm, threepm);
    const fta = Math.round(ftm / DEFAULT_FT_PERC); // TODO Use account stored FT % if acc already exists
    // * double double, triple doubles, quadruple doubles
    const { dd, td, qd } = calculateDoubles(pts, treb, ast, stl, blk);

    // * Add simple stats to player object
    formattedPlayer = {
      ...playerData,
      mp,
      dreb,
      oreb,
      twopa,
      twopm,
      ftm,
      fta,
      dd,
      td,
      qd
    };

    // * Calculate advanced offensive stats
    const { ortg, floorPerc, astPerc, tovPerc, usageRate, gameScore } =
      calculateAdvancedOffensiveStats(formattedPlayer, team);

    const opOREB = playerReboundData[opponent.name]?.oreb || 0;
    // * Calculate advanced defensive stats
    const { drtg, drebPerc, oFGA, oFGM, o3PA, o3PM } = calculateAdvancedDefensiveStats(
      formattedPlayer,
      opponent,
      opOREB,
      team
    );

    return {
      ...formattedPlayer,
      oFGA,
      oFGM,
      o3PA,
      o3PM,
      ortg,
      floorPerc,
      astPerc,
      tovPerc,
      usageRate,
      gameScore,
      drtg,
      drebPerc
    };
  });

  // * Batch writes
  const batch = admin.firestore().batch();
  formattedPlayerData.forEach((player) => {
    const gamesRef = admin.firestore().collection('games').doc();
    batch.set(gamesRef, {
      ...player,
      _createdAt: admin.firestore.Timestamp.now(),
      _updatedAt: admin.firestore.Timestamp.now()
    });
  });

  await batch.commit().then((docRef) => {
    // eslint-disable-next-line no-console
    console.log('Document written with ID: ', docRef.id);
  });

  res.json({ formattedPlayerData, formattedTeamData });
};

module.exports = uploadStats;
