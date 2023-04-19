const admin = require('firebase-admin');

// * Fetches players for table
const fetchForTable = async (req, res) => {
  const { sortField, sortType, limit } = req.body;

  const db = admin.firestore();
  const playerData = [];
  let rank = 1;

  await db
    .collection('players')
    .orderBy(sortField, sortType)
    .limit(limit ?? 10)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        playerData.push({ ...doc.data(), id: doc.id, rank });
        rank += 1;
      });
    })
    .catch((error) => {
      throw new Error('Could not query firestore', error);
    });

  res.send(playerData);
};

module.exports = fetchForTable;
