"use strict";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors');
const express = require('express');
const storeGM = require('./api/lookup.js');
const getPopularity = require('./api/popularity.js');
const app = express();
app.use(cors());
const whitelist = ['http://localhost:3000', 'https://gabrielhub.github.io/hub'];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false
    }; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.post('/lookup', cors(corsOptionsDelegate), storeGM);
app.get('/popularity', cors(corsOptionsDelegate), getPopularity);
exports.app = functions.https.onRequest(app);