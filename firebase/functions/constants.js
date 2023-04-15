const functions = require('firebase-functions');

const UPLOAD_KEY = functions.config().hub.uploadkey;
const NANONET_KEY = functions.config().hub.nanonetkey;

/* const UPLOAD_KEY = 'test1';
const NANONET_KEY = 'test2'; */

module.exports = { UPLOAD_KEY, NANONET_KEY };
