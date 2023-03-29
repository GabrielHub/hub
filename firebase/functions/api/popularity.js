const admin = require('firebase-admin');

// * TO TEST:
// ? app.get('/popularity')

/**
 * @description function to return list of sorted gms by popularity
 * @param {*} req
 * @param {*} res
 * @returns {*} array of gm usernames ranked by popularity (requests)
 */
const getPopularity = async (req, res) => {
  const gmResponse = [];
  const gmRef = admin.firestore().collection('gms');
  const snapshot = await gmRef.orderBy('requests', 'desc').get();
  snapshot.forEach((doc) => {
    gmResponse.push(doc.data().username);
  });

  res.json(gmResponse);
};

module.exports = getPopularity;
