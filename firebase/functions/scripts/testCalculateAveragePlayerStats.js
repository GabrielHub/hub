const calculateAveragePlayerStats = require('../utils/calculateAveragePlayerStats');
const gameData = require('../mocks/mockGameData');

// TODO Before using this again, add league data to calculateAveragePlayerStats
const testCalculateAveragePlayerStats = async () => {
  /*
const db = admin.firestore();

  const name = 'Beach';

  const playerQuerySnapshot = await db
    .collection('players')
    .where('alias', 'array-contains', name)
    .get();

  if (playerQuerySnapshot.empty) {
    // eslint-disable-next-line no-console
    console.log('DIDNT FIND?!?! UH OH');
  } else {
    // * This should always return valid data
    const playerData = playerQuerySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    })[0];

    const { name: storedName, alias, ftPerc } = playerData;

    const gameDataRef = await db.collection('games').where('name', 'in', alias).get();
    const gameData = gameDataRef.docs.map((doc) => doc.data());

    const avgPlayerStats = calculateAveragePlayerStats(gameData, storedName, alias, ftPerc);

    // eslint-disable-next-line no-console
    console.log('gameData', avgPlayerStats);

  */
  const playerDoc = calculateAveragePlayerStats([gameData], gameData.name);
  // eslint-disable-next-line no-console
  console.log(playerDoc);
};

testCalculateAveragePlayerStats();
