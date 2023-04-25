const admin = require('firebase-admin');
const NBA_PER_100 = require('../mocks/nbaDataAdvanced');

// * Takes NBA Per 100 data and adds it to database (2023 season)
const addNBAData = async () => {
  const db = admin.firestore();

  // * Cut out anyone who played less than half a season
  const playersToAdd = NBA_PER_100.filter((player) => player?.gp > 40);

  const batch = db.batch();
  playersToAdd.forEach((player) => {
    const playerRef = admin.firestore().collection('nba').doc();
    batch.set(playerRef, player);
  });

  await batch.commit().then((docRef) => {
    // eslint-disable-next-line no-console
    console.log('Document written with ID: ', docRef.id);
  });
};

module.exports = addNBAData;
