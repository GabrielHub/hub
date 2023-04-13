const admin = require('firebase-admin');

// * Fields to use in comparisons (checking if a game is a duplicate)
const similarityFieldsToCheck = [
  'name',
  'pos',
  'pts',
  'ast',
  'stl',
  'blk',
  'pf',
  'tov',
  'fgm',
  'fga',
  'threepm',
  'threepa',
  'o3PA',
  'o3PM',
  'oFGA',
  'oFGM'
];

/**
 * @description Find all the duplicate games
 * @param {*} games array of games
 * @param {*} fields fields to compare
 * @returns an array of game ids
 */
const findDuplicateGames = (games, fields) => {
  // Create an object to store unique combinations of property values
  const uniqueCombinations = {};

  // Iterate through each object in the input array
  games.forEach((game) => {
    // Generate a unique key based on the values of the specified properties
    const key = fields.map((prop) => game[prop]).join(',');

    // If the key doesn't exist in uniqueCombinations, create an array for it
    if (!uniqueCombinations[key]) {
      uniqueCombinations[key] = [];
    }

    // Push the game's id into the array associated with the key
    uniqueCombinations[key].push(game.id);
  });

  // Filter out keys that have only one object (i.e., not duplicates)
  const duplicateKeys = Object.keys(uniqueCombinations).filter(
    (key) => uniqueCombinations[key].length > 1
  );

  // Flatten the arrays of ids for duplicate keys into a single array
  const duplicateIds = [].concat(...duplicateKeys.map((key) => uniqueCombinations[key]));

  // Return the array of duplicate ids
  return duplicateIds;
};

/**
 * @description Cron job / pubsub to delete duplicate games
 * @returns null
 */
const deleteDuplicateGames = async () => {
  const db = admin.firestore();
  try {
    const querySnapshot = await db.collection('games').get();

    const gameList = [];
    querySnapshot.docs.forEach((doc) => {
      gameList.push({ ...doc.data(), id: doc.id });
    });

    const gamesToDelete = findDuplicateGames(gameList, similarityFieldsToCheck);

    const promises = gamesToDelete.map((id) => db.collection('games').doc(id).delete());

    await Promise.all(promises);

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

module.exports = deleteDuplicateGames;
