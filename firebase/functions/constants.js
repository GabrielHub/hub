const functions = require('firebase-functions');

const UPLOAD_KEY = functions.config().hub.uploadkey;
const NANONET_KEY = functions.config().hub.nanonetkey;

module.exports = { UPLOAD_KEY, NANONET_KEY };
