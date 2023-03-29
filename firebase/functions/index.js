const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

const whitelist = ['http://localhost:3000'];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.get('/lookup', cors(corsOptionsDelegate), (req, res) => {
  res.send('hello world!');
});

exports.app = functions.https.onRequest(app);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
