const roundForReadable = (value, precision = 1) => {
  if (value === 0) {
    return 0;
  }
  const multiplier = 10 ** (precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

module.exports = roundForReadable;
