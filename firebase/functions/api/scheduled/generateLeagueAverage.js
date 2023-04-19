const admin = require('firebase-admin');
const dayjs = require('dayjs');
const round = require('../../utils/roundForReadable');

const STATS_TO_ADD = [
  'pts',
  'treb',
  'dreb',
  'oreb',
  'ast',
  'stl',
  'blk',
  'tov',
  'pf',
  'ortg',
  'drtg',
  'fga',
  'fgm',
  'fta',
  'ftm',
  'pace',
  'gameScore',
  'usageRate'
];

const generateLeagueAverage = async () => {
  const db = admin.firestore();
  try {
    const querySnapshot = await db.collection('players').get();

    const playerList = [];
    querySnapshot.docs.forEach((doc) => {
      const playerData = doc.data();
      // * Players only have averages past 5 games, make sure data exists first
      if (playerData?.gp) {
        playerList.push(playerData);
      }
    });

    // * Initialize averages with 0 for each stat
    const averageGameStats = {};
    STATS_TO_ADD.forEach((stat) => {
      averageGameStats[stat] = 0;
    });

    // * Average stats per game played for each player
    playerList.forEach((playerData) => {
      STATS_TO_ADD.forEach((stat) => {
        averageGameStats[stat] += playerData[stat];
      });
    });
    Object.keys(averageGameStats).forEach((stat) => {
      averageGameStats[stat] = round(averageGameStats[stat] / playerList.length);
    });

    await db.collection('league').add({
      ...averageGameStats,
      players: playerList.length,
      // * Store each league average as historical data
      createdAt: dayjs().format('YYYY-MM-DD')
    });

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

module.exports = generateLeagueAverage;
