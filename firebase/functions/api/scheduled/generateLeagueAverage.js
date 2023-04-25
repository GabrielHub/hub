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
  'threepa',
  'threepm',
  'threepAR',
  'fta',
  'ftm',
  'pace',
  'gameScore',
  'usageRate'
];

/**
 * @description finds amount to divide by for stats that aren't valid across all players (APER and PACE)
 * @param {*} playerList
 * @returns
 */
const getMissingStatAmount = (playerList, stat) => {
  return playerList.reduce((count, player) => {
    if (player?.[stat]) {
      return count + 1;
    }
    return count;
  }, 0);
};

const generateLeagueAverage = async () => {
  const db = admin.firestore();

  // * Missing Data, data that may not be there for all players
  const MISSING_DATA = ['pace', 'aPER'];

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
        if (playerData[stat]) {
          averageGameStats[stat] += playerData[stat];
        }
      });
    });
    Object.keys(averageGameStats).forEach((stat) => {
      // * For now hardcode this missing stat (pace)
      if (MISSING_DATA.includes(stat)) {
        const paceLength = getMissingStatAmount(playerList, stat);
        averageGameStats[stat] = round(averageGameStats[stat] / paceLength);
      } else {
        averageGameStats[stat] = round(averageGameStats[stat] / playerList.length);
      }
    });

    // * Set league average PER to 15 as per Hollinger https://www.basketball-reference.com/about/per.html
    averageGameStats.PER = 15;

    // * Average aPER should be done on a per game basis (not per player) to account for minutes played
    let sumOfAPER = 0;
    let gamesWithAPER = 0;
    playerList.forEach(({ aPER, aPERGamesPlayed }) => {
      if (aPER && aPERGamesPlayed) {
        sumOfAPER += aPER * aPERGamesPlayed;
        gamesWithAPER += aPERGamesPlayed;
      }
    });
    const aPER = sumOfAPER / gamesWithAPER;
    averageGameStats.aPER = aPER;

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
