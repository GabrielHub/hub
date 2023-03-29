const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');
const fetchGM = require('../rest/fetchGM.js');

// * TO TEST:
// ? app.post('/lookup').form({ username: 'dm-nate' })

/**
 * @description function to fetch lookups and set them in firestore database
 * @param {*} req
 * @param {*} res
 * @returns {*} Obect of document written to firestore
 */
const storeGM = async (req, res) => {
  const { username } = req.body;
  if (typeof username !== 'string') {
    throw new Error('Invalid parameter passed');
  }

  // * Lookup GM
  const { data, error } = await fetchGM(username);
  const gm = data?.gms?.[0];
  if (error || !gm) {
    throw new Error('Could not query GM');
  }

  let writtenObject = {};
  const gmRef = admin.firestore().collection('gms');
  // * Format to get username, image, number of reviews and id
  const { id, gmProfile, image, username: gmUsername, name } = gm;

  const gmDocRef = await gmRef.doc(id).get();
  if (!gmDocRef.exists) {
    // * Add document if it does not exist
    writtenObject = {
      username: gmUsername,
      reviews: gmProfile?.gmStats?.numReviews,
      requests: 0,
      image,
      name
    };
    await gmRef.doc(id).set(writtenObject);
  } else {
    // * Increment the request;
    const gmData = gmDocRef.data();
    writtenObject = {
      username: gmData?.username,
      reviews: gmData?.reviews,
      requests: gmData?.requests + 1,
      image: gmData?.image,
      name: gmData?.name
    };
    await gmRef.doc(id).update({ requests: FieldValue.increment(1) });
  }

  res.json(writtenObject);
};

module.exports = storeGM;
