const admin = require('firebase-admin');
const findSimilarPlayers = require('../utils/findSimilarPlayers');

// * app.get('/similarity?playerID=fqC6mRi0w5YGQ35cMaoQ')

/**
 * @description Looks up player stats and returns the 3 closest NBA Players from 2023
 * @param {*} req
 * @param {*} res
 */
const compareToNBA = async (req, res) => {
  const { playerID } = req.query;

  if (!playerID || typeof playerID !== 'string') {
    throw new Error('Invalid player passed');
  }

  const db = admin.firestore();
  const playerData = await db
    .collection('players')
    .doc(playerID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      throw new Error('Player does not exist');
    });

  const nbaData = [];
  await db
    .collection('nba')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        nbaData.push(doc.data());
      });
    });

  const similarPlayers = findSimilarPlayers(playerData, nbaData);

  res.send(similarPlayers);
};

module.exports = compareToNBA;
