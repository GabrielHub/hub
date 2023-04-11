const admin = require('firebase-admin');
const calculateAveragePlayerStats = require('../utils/calculateAveragePlayerStats');

// * Currently testing multi game update on game trigger

// * Just using this to test some stuff I don't want to set up the firestore emulator for
const testFirebaseStuff = async (req, res) => {
  const db = admin.firestore();

  const name = 'WetBread';

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
  }
  res.send('Stop using me');
};

module.exports = testFirebaseStuff;
