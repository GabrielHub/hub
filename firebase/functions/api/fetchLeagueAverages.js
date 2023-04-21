const admin = require('firebase-admin');
const nodecache = require('node-cache');

// eslint-disable-next-line new-cap
const cache = new nodecache({ stdTTL: 3599 });

// * Fetches players for table
const fetchLeagueAverages = async (req, res) => {
  if (cache.has('leagueData')) {
    res.send(cache.get('leagueData'));
  } else {
    const db = admin.firestore();

    const league = await db
      .collection('league')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
      .then((querySnapshot) => {
        // * should only be one because of limit
        const leagueData = [];
        querySnapshot.forEach((doc) => {
          leagueData.push(doc.data());
        });
        return leagueData[0];
      });

    cache.set('leagueData', league);
    res.send(league);
  }
};

module.exports = fetchLeagueAverages;
