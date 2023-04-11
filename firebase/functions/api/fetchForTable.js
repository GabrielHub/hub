const admin = require('firebase-admin');

// * Fetches players for table
const fetchForTable = async (req, res) => {
  const { sortField, sortType, limit = 10 } = req.body;

  const db = admin.firestore();
  const playerData = [];

  await db
    .collection('players')
    .orderBy(sortField, sortType)
    .limit(limit)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        playerData.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((error) => {
      throw new Error('Could not query firestore', error);
    });

  res.send(playerData);
};

module.exports = fetchForTable;
