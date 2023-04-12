const admin = require('firebase-admin');

// * For individual player pages
const fetchPlayerData = async (req, res) => {
  const { playerID } = req.query;

  if (!playerID || typeof playerID !== 'string') {
    throw new Error('Invalid parameter passed');
  }

  const db = admin.firestore();
  const playerData = await db
    .collection('players')
    .doc(playerID)
    .get()
    .then((doc) => {
      // * undefined if player does not exist
      return doc.data();
    });

  res.send(playerData);
};

module.exports = fetchPlayerData;
