'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _models = require('../models.js');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var Document = _models2.default.Document;
var Test = _models2.default.Test;
var axios = require('axios');

var request = require('ajax-request');

function hashPassword(password) {
  return CryptoJS.AES.encrypt(password, 'secret key 123').toString();
}

router.get('/getTranscript', function (req, res) {
  console.log("TRANSCRIPT REQUEST RECEIVED");
  var output = 'I\'m here to tell you tonight. We believe we\'re on track to win this election.\n\n From The New York Times. I\'m Michael borrow. This is a daily today. So we\'ll be going to the US Supreme Court. We want all voting to start. It ain\'t over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don\'t want them to find any ballots at\n\n Four o\'clock in the morning and add them to the list. Okay.\n\n It\'s going to take time to count the votes. We\'re going to win, Pennsylvania.\n\n Alex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.\n\n I\'m here to tell you tonight. We believe we\'re on track to win this election.\n\nFrom The New York Times. I\'m Michael borrow. This is a daily today. So we\'ll be going to the US Supreme Court. We want all voting to start. It ain\'t over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don\'t want them to find any ballots at\n\nFour o\'clock in the morning and add them to the list. Okay.\n\nIt\'s going to take time to count the votes. We\'re going to win, Pennsylvania.\n\nAlex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.\n\nI\'m here to tell you tonight. We believe we\'re on track to win this election.\n\nFrom The New York Times. I\'m Michael borrow. This is a daily today. So we\'ll be going to the US Supreme Court. We want all voting to start. It ain\'t over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don\'t want them to find any ballots at\n\nFour o\'clock in the morning and add them to the list. Okay.\n\nIt\'s going to take time to count the votes. We\'re going to win, Pennsylvania.\n\nAlex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.\n\nI\'m here to tell you tonight. We believe we\'re on track to win this election.\n\nFrom The New York Times. I\'m Michael borrow. This is a daily today. So we\'ll be going to the US Supreme Court. We want all voting to start. It ain\'t over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don\'t want them to find any ballots at\n\nFour o\'clock in the morning and add them to the list. Okay.\n\nIt\'s going to take time to count the votes. We\'re going to win, Pennsylvania.\n\nAlex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.\n\n\n  ';
  res.send(JSON.stringify(output));
});

router.get('/getTags', function (req, res) {

  axios.get('http://localhost:5000/podcast/timestamp').then(function (response) {
    console.log("success");
    console.log(response.data);
  }).catch(function (error) {
    console.log("Failed!!");
    console.log(error.response);
  });
});

exports.default = router;