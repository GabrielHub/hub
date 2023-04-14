const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');

// * Rest functions
const storeGM = require('./api/lookup');
const getPopularity = require('./api/popularity');
const uploadStats = require('./api/upload');
const fetchForTable = require('./api/fetchForTable');
const testFirebaseStuff = require('./api/testFirebaseStuff');
const fetchPlayerData = require('./api/fetchPlayerData');
const updatePlayerDetails = require('./api/updatePlayerDetails');

// * Cloud triggers
const upsertPlayerData = require('./api/triggers/games');

// * Cron jobs
const deleteDuplicateGames = require('./api/scheduled/deleteDuplicateGames');

// * webhooks
const NanonetsWebhook = require('./api/webhook/nanonets');

admin.initializeApp();

const app = express();
app.use(cors());

const whitelist = ['http://localhost:3000', 'https://gabrielhub.github.io/hub'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// * REST endpoints
app.post('/lookup', cors(corsOptionsDelegate), storeGM);
app.get('/popularity', cors(corsOptionsDelegate), getPopularity);
app.post('/upload', cors(corsOptionsDelegate), uploadStats);
app.get('/testFunctions', cors(corsOptionsDelegate), testFirebaseStuff);
app.post('/queryTableData', cors(corsOptionsDelegate), fetchForTable);
app.get('/lookupPlayer', cors(corsOptionsDelegate), fetchPlayerData);
app.post('/updatePlayerDetails', cors(corsOptionsDelegate), updatePlayerDetails);
// * webhook
app.post('/nanonets/webhook', cors(corsOptionsDelegate), NanonetsWebhook);
exports.app = functions.https.onRequest(app);

// * Cloud Triggers
exports.upsertPlayerData = functions.firestore.document('games/{gameId}').onWrite(upsertPlayerData);
exports.deleteDuplicateGames = functions.pubsub
  .schedule('0 23 * * *')
  .timeZone('America/New_York')
  .onRun(deleteDuplicateGames);
