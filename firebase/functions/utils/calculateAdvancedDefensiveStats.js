const calculateTwoPointers = require('./calculateTwoPointers');
const calculateFreeThrowsMade = require('./calculateFreeThrows');

// TODO We need to use this until we have more data (league average data)
const DEFAULT_FT_PERC = 0.72;

const calculateAdvancedDefensiveStats = (player, opponent, team) => {
  // * Calculating advanced defensive stats (we only calculate the advanced stats that require opponent or team numbers)
  // * Stats that do not require opponent or team info we can average elsewhere

  // * Opponent constants
  const { twopm: opTwoPM } = calculateTwoPointers(
    opponent.fga,
    opponent.fgm,
    opponent.threepa,
    opponent.threepm
  );
  // * We cannot get the FTA without knowing FT%, so just calculate FTM
  const opFTM = calculateFreeThrowsMade(opponent.pts, opTwoPM, opponent.threepm) || 1;
  const opFTA = Math.round(opFTM / DEFAULT_FT_PERC) || 1;
  const opFTDivision = opFTA !== 0 ? opFTM / opFTA : 1;
  const opMin = 20;

  // * assuming opponent oreb is 0, otherwise Opponent_ORB / (Opponent_ORB + Team_DRB)

  const dorPerc = 0;
  const dfgPerc = opponent.fgm / opponent.fga;
  const FMWT = (dfgPerc * (1 - dorPerc)) / (dfgPerc * (1 - dorPerc) + (1 - dfgPerc) * dorPerc);
  const stops =
    player.stl +
    player.blk * FMWT * (1 - 1.07 * dorPerc) +
    player.dreb * (1 - FMWT) +
    ((((opponent.fga - opponent.fgm - team.blk) / team.mp) * FMWT * (1 - 1.07 * dorPerc) +
      (opponent.tov - team.stl) / team.mp) *
      player.mp +
      (player.pf / team.pf) * 0.4 * opFTA * (1 - opFTDivision) ** 2);

  const stopPerc = (stops * opMin) / (team.totalPoss * player.mp);
  const teamDefensiveRating = 100 * (opponent.pts / team.totalPoss);
  const defensivePtsPerScoringPoss =
    opponent.pts / (opponent.fgm + (1 - (1 - opFTDivision)) ** 2 * opFTA * 0.4);

  // * DRTG:  how many points the player allowed per 100 possessions he individually faced while on the court.
  const drtg =
    teamDefensiveRating +
    0.2 * (100 * defensivePtsPerScoringPoss * (1 - stopPerc) - teamDefensiveRating);

  // * BLK%: estimate of the percentage of opponent two-point field goal attempts blocked by the player while he was on the floor
  // TODO This cannot be calculated since there are often situations where 3pa === fga which leads to null
  /* const blkPerc =
    (100 * (player.blk * (team.mp / 5))) / (player.mp * (opponent.fga - opponent.threepa)); */

  // * DRB%: the percentage of available defensive rebounds a player grabbed while he was on the floor. 0 is the opponents offensive rebounds
  const drebPerc = (100 * (player.dreb * (team.mp / 5))) / (player.mp * (team.reb + 0));

  // * STL%: estimate of the percentage of opponent possessions that end with a steal by the player while he was on the floor
  // TODO I can't calculate this without the opponnents possessions

  // * opponent efficiency
  const oFGA = opponent.fga;
  const oFGM = opponent.fgm;
  const o3PA = opponent.threepa;
  const o3PM = opponent.threepm;

  return { drtg, drebPerc, oFGA, oFGM, o3PA, o3PM };
};

module.exports = calculateAdvancedDefensiveStats;
