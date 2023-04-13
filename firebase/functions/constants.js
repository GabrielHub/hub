const functions = require('firebase-functions');

const UPLOAD_KEY = functions.config().hub.uploadkey;

module.exports = { UPLOAD_KEY };
