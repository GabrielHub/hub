const admin = require('firebase-admin');

// TODO This is updated on the honor system... there must be some way to authenticate without logging in?
// * For individual player pages (FT% and alias only)
const updatePlayerDetails = async (req, res) => {
  // * aliasesToAdd only contains the new aliases to check against the database
  // * alias is the existing alias array
  const { playerID, ftPerc, alias, aliasesToAdd } = req.body;

  if (!playerID || typeof playerID !== 'string') {
    throw new Error('Invalid player passed');
  }

  if (!ftPerc || typeof ftPerc !== 'number') {
    throw new Error('Invalid ftPerc');
  }

  if (!aliasesToAdd || !aliasesToAdd.length) {
    throw new Error('Invalid aliases');
  }

  // * Trim inputs for whitespace and validate types
  const formattedAlias = aliasesToAdd.map((name) => {
    if (typeof name !== 'string') {
      throw new Error('Invalid aliases');
    }
    return name.trim();
  });

  const db = admin.firestore();
  // * Make sure alias is unique
  const existingAliasMatch = [];

  await db
    .collection('players')
    .where('alias', 'array-contains-any', formattedAlias)
    .get()
    .forEach((querySnapshot) => {
      querySnapshot.doc((doc) => {
        existingAliasMatch.push(doc.data()?.name);
      });
    });

  if (existingAliasMatch.length) {
    throw new Error(`Aliases ${existingAliasMatch.toString()} already exist`);
  }

  const aliasesToUpdate = [...alias, ...aliasesToAdd];
  await db
    .collection('players')
    .doc(playerID)
    .update({
      alias: aliasesToUpdate
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Successfully updated document');
    })
    .error((error) => {
      throw new Error('Player does not exist', error);
    });

  res.send(aliasesToUpdate);
};

module.exports = updatePlayerDetails;
