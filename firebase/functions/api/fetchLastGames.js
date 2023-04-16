const admin = require('firebase-admin');

/**
 * @description Returns the last number of games for a player (ex. last 5 games played)
 * @param {*} req
 * @param {*} res
 */
const fetchLastGame = async (req, res) => {
  const { playerID, numOfGames } = req.query;

  if (!playerID || typeof playerID !== 'string') {
    throw new Error('Invalid player passed');
  }

  const formattedNumOfGames = parseInt(numOfGames, 10);

  if (!formattedNumOfGames || typeof formattedNumOfGames !== 'number') {
    throw new Error('Invalid number of games');
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

  // * Fetch last number of games
  const lastGames = [];

  await db
    .collection('games')
    .where('name', 'in', playerData.alias)
    .orderBy('_updatedAt', 'desc')
    .limit(formattedNumOfGames)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        lastGames.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((error) => {
      throw new Error('Could not query firestore', error);
    });

  res.send(lastGames);
};

module.exports = fetchLastGame;
