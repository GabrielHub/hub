const round = require('./roundForReadable');

/**
 * @description format and calculate player averages for player object
 * @param {*} gameData required
 * @param {*} name required
 * @param {*} alias
 * @param {*} ftPerc
 * @returns
 */
const calculateAveragePlayerStats = (gameData, name, alias = [], ftPerc = 50) => {
  // TODO Calculate PER, Pace and Add PProd (points produced) and stops
  // * These are not values we want to average
  // * FT% is a constant defined by the user. We won't update this ever programatically
  const propertiesToSkip = ['name', 'alias', 'ftPerc'];
  // * Initialize player so we can add values before dividing at the end
  const playerData = {
    name,
    alias: alias.length ? alias : [name],
    ftPerc,
    pts: 0,
    treb: 0,
    ast: 0,
    stl: 0,
    blk: 0,
    pf: 0,
    tov: 0,
    fgm: 0,
    fga: 0,
    twopm: 0,
    twopa: 0,
    threepm: 0,
    threepa: 0,
    ftm: 0,
    fta: 0,
    oreb: 0,
    dreb: 0,
    drebPerc: 0,
    astPerc: 0,
    tovPerc: 0,
    usageRate: 0,
    ortg: 0,
    drtg: 0,
    gameScore: 0,
    dd: 0,
    td: 0,
    qd: 0,
    o3PA: 0,
    o3PM: 0,
    oFGA: 0,
    oFGM: 0
  };

  // * DRtg can be NaN if the opponent took 0 fg, so skip over games where this is the case and do different division
  const statsWithNaN = {};

  // * Sum the basic values (some % values are in here because they use team or opponent data)
  gameData.forEach((data) => {
    Object.keys(data).forEach((stat) => {
      // console.log(stat, Object.prototype.hasOwnProperty.call(playerData, stat));
      if (
        Object.prototype.hasOwnProperty.call(playerData, stat) &&
        !propertiesToSkip.includes(stat)
      ) {
        // * check if number is NaN
        if (!Number.isNaN(data[stat])) {
          // * Normal logic for stats that have values
          playerData[stat] += data[stat];
        } else if (Object.prototype.hasOwnProperty.call(statsWithNaN, stat)) {
          // * Update it with one less games to count for the averages
          statsWithNaN[stat] -= statsWithNaN[stat];
        } else {
          // * Add this stat to start counting games not including NaN games
          statsWithNaN[stat] = gameData.length - 1;
        }
      }
    });
  });

  // * Average values by number of games and round them
  Object.keys(playerData).forEach((stat) => {
    if (!propertiesToSkip.includes(stat)) {
      // TODO figure out how to save precision
      // ? Rounding here saves a loop but also makes the Perc calculations below less precise...

      // * Check if stat is normal (never had a NaN value)
      let divideFactor = gameData.length;
      if (Object.prototype.hasOwnProperty.call(statsWithNaN, stat) && statsWithNaN[stat] > 0) {
        // * if there aren't enough games, avoid dividing by 0 or a - number
        divideFactor = statsWithNaN[stat];
      }
      playerData[stat] = round(playerData[stat] / divideFactor);
    }
  });

  playerData.gp = gameData.length;
  // * Add Percentage values ie. EFG% TS% OFG% etc.
  playerData.fgPerc = round(100 * (playerData.fgm / playerData.fga)) || null;
  playerData.twoPerc = round(100 * (playerData.twopm / playerData.twopa)) || null;
  playerData.threePerc = round(100 * (playerData.threepm / playerData.threepa)) || null;
  playerData.tsPerc =
    round(100 * (playerData.pts / (2 * (playerData.fga + 0.44 * playerData.fta)))) || null;
  playerData.efgPerc =
    round(100 * ((playerData.fgm + 0.5 ** playerData.threepm) / playerData.fga)) || null;
  playerData.threepAR = round(100 * (playerData.threepa / playerData.fga));

  playerData.astToRatio = round(playerData.ast / playerData.tov);

  // * Defensive stats (opponent efficiency)
  playerData.oFGPerc = round(100 * (playerData.oFGM / playerData.oFGA)) || null;
  playerData.o3PPerc = round(100 * (playerData.o3PM / playerData.o3PA)) || null;
  playerData.oEFGPerc =
    round(100 * ((playerData.oFGM + 0.5 ** playerData.o3PM) / playerData.oFGA)) || null;

  return playerData;
};

module.exports = calculateAveragePlayerStats;
