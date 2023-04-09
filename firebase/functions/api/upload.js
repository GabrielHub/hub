// const admin = require('firebase-admin');
const mockData = require('../mocks/mockUploadData');
const calculateTwoPointers = require('../utils/calculateTwoPointers');
const calculateFreeThrowsMade = require('../utils/calculateFreeThrows');
const calculateDoubles = require('../utils/calculateDoubles');
const calculateAdvancedOffensiveStats = require('../utils/calculateAdvancedOffensiveStats');
const calculateAdvancedDefensiveStats = require('../utils/calculateAdvancedDefensiveStats');

// TODO We need to use this until we have more data (league average data)
const DEFAULT_FT_PERC = 0.72;

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

  const formattedTeamData = {};

  // * Calculate oreb for both teams first (estimations)

  Object.keys(mockData.rawTeamData).forEach((teamKey) => {
    const mp = 100; // * Each games is 20 minutes so total minutes is always 100

    // * Load image recognized stats first
    // * Destructure stats that we'll use for calculations and readability
    const teamData = mockData.rawTeamData[teamKey];
    const opponent = teamKey === 1 ? mockData.rawTeamData[2] : mockData.rawTeamData[1];
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

    // TODO Figure out a way to calculate OREB
    const dreb = reb;
    const oreb = 0;
    // * Team ORB% cannot be calculated so keep it at 0%
    const ORBPerc = oreb / (oreb + (opponent.reb + 0));
    const ORBPart = 0;

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
      ORBPart,
      scoringPoss,
      playPerc,
      ORBWeight,
      mp
    };
  });

  const formattedPlayerData = mockData.rawPlayerData.map((playerData) => {
    let formattedPlayer = {};
    // * Load image recognized stats first
    // * Destructure stats that we'll use for calculations and readability
    const { team: teamKey, pts, pos, treb, ast, stl, blk, fgm, fga, threepm, threepa } = playerData;

    // * Team data ( might be a waste of space...? )
    const team = formattedTeamData[teamKey];
    const opponent = mockData.rawPlayerData.find(
      (player) => player.pos === pos && player.team !== teamKey
    );

    // * minutes played
    const mp = 20;

    // * Assume there are no offensive rebounds since we have no way of figuring out oreb
    const dreb = treb;
    const oreb = 0;
    // * Get 2PM to figure out FTM
    const { twopa, twopm } = calculateTwoPointers(fga, fgm, threepa, threepm);
    // * We cannot get the FTA without knowing FT%, so just calculate FTM
    const ftm = calculateFreeThrowsMade(pts, twopm, threepm);
    const fta = Math.round(ftm / DEFAULT_FT_PERC); // TODO Use account stored FT %
    // * double double, triple doubles, quadruple doubles
    const { dd, tp, qd } = calculateDoubles(pts, treb, ast, stl, blk);

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
      tp,
      qd
    };

    // * Calculate advanced offensive stats
    const { ortg, floorPerc, astPerc, tovPerc, usageRate, gameScore } =
      calculateAdvancedOffensiveStats(formattedPlayer, team);

    // * Calculate advanced defensive stats
    const { drtg, drebPerc, oFGA, oFGM, o3PA, o3PM } = calculateAdvancedDefensiveStats(
      formattedPlayer,
      opponent,
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

  // TODO Upload to firestore

  res.json({ formattedPlayerData, formattedTeamData });
};

module.exports = uploadStats;
