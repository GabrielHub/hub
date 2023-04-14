const getExpectedORebounds = (treb, expected) => {
  const stdDev = treb / 6;
  const randomNumber = stdDev * (2 * Math.random() - 1);
  const finalNumber = Math.min(Math.max(randomNumber + expected, 0), treb);
  return Math.floor(finalNumber);
};

module.exports = getExpectedORebounds;
