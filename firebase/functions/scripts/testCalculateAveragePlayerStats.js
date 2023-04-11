const calculateAveragePlayerStats = require('../utils/calculateAveragePlayerStats');
const gameData = require('../mocks/mockGameData');

const testCalculateAveragePlayerStats = async () => {
  const playerDoc = calculateAveragePlayerStats([gameData], gameData.name);
  // eslint-disable-next-line no-console
  console.log(playerDoc);
};

testCalculateAveragePlayerStats();
