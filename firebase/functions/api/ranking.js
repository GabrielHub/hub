const admin = require('firebase-admin');

// * Fetches individual defensive and offensive ranking for one player (for the player page)
const fetchIndividualRanking = async (req, res) => {
  const { playerID } = req.query;

  if (!playerID || typeof playerID !== 'string') {
    throw new Error('Invalid query parameters');
  }

  const ranking = {};

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

  const queryORTG = db
    .collection('players')
    .where('ortg', '>', playerData?.ortg)
    .orderBy('ortg', 'desc');

  const offensiveRanking = await queryORTG.count().get();

  const queryDRTG = db
    .collection('players')
    .where('drtg', '<', playerData?.drtg)
    .orderBy('drtg', 'asc');

  const defensiveRanking = await queryDRTG.count().get();

  ranking.offense = offensiveRanking.data().count + 1;
  ranking.defense = defensiveRanking.data().count + 1;

  res.send(ranking);
};

module.exports = fetchIndividualRanking;
