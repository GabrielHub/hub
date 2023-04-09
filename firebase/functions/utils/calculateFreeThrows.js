/**
 *
 * @param {*} points
 * @param {*} twoPM
 * @param {*} threePM
 * @returns
 */
const calculateFreeThrowsMade = (points, twoPM, threePM) => {
  const ftm = points - (twoPM * 2 + threePM * 3);
  return ftm;
};

module.exports = calculateFreeThrowsMade;
