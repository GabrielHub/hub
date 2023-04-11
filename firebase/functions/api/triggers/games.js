const admin = require('firebase-admin');
const functions = require('firebase-functions');
const calculateAveragePlayerStats = require('../../utils/calculateAveragePlayerStats');

const GAME_TRIGGER_STATUS_ENUMS = {
  IN_PROGRESS: 'in-progress',
  SUCCESS: 'success',
  FAIL: 'failed'
};

// * Update players when games are added
const upsertPlayerData = async (snapshot) => {
  const data = snapshot.after.data();
  const { name, gameTrigger = {} } = data;
  const gameRef = snapshot.after.ref;

  const db = admin.firestore();
  try {
    if (
      gameTrigger?.status === GAME_TRIGGER_STATUS_ENUMS.IN_PROGRESS ||
      gameTrigger?.status === GAME_TRIGGER_STATUS_ENUMS.SUCCESS ||
      gameTrigger?.status === GAME_TRIGGER_STATUS_ENUMS.FAIL
    ) {
      functions.logger.info('Skipping sendMail trigger.', `status is ${gameTrigger.status}`);
      return;
    }

    gameRef.update({
      gameTrigger: {
        status: GAME_TRIGGER_STATUS_ENUMS.IN_PROGRESS,
        date: admin.firestore.Timestamp.now()
      }
    });

    // * If player does not exist, create it and use data as averages.
    const playerQuerySnapshot = await db
      .collection('players')
      .where('alias', 'array-contains', name)
      .get();

    if (playerQuerySnapshot.empty) {
      const playerData = calculateAveragePlayerStats([data], name);
      await db.collection('players').add(playerData);
    } else {
      // TODO Finish updating
      // * We have a player, fetch data and update values
    }

    gameRef.update({
      gameTrigger: {
        status: GAME_TRIGGER_STATUS_ENUMS.SUCCESS,
        date: admin.firestore.Timestamp.now()
      }
    });
  } catch (error) {
    functions.logger.error('Error in game trigger', error);
    gameRef.update({
      gameTrigger: {
        status: GAME_TRIGGER_STATUS_ENUMS.FAIL,
        date: admin.firestore.Timestamp.now()
      }
    });
  }
};

module.exports = upsertPlayerData;
