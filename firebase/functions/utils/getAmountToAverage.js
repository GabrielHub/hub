/**
 * @description Counts how many times a stat exists in an array of games
 * @param {*} gameData
 * @param {*} stat
 * @returns number of times a stat exists to use to divide totals
 */
const getAmountToAverage = (gameData, stat) => {
  return gameData.reduce((count, game) => {
    if (Object.prototype.hasOwnProperty.call(game, stat)) {
      return count + 1;
    }
    return count;
  }, 0);
};

module.exports = getAmountToAverage;
