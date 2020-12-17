import express from 'express';
import crypto from 'crypto';
import models from '../models.js';

const router = express.Router();
const Document = models.Document;
const Test = models.Test;
const axios = require('axios');

var request = require('ajax-request');

function hashPassword(password) {
  return CryptoJS.AES.encrypt(password, 'secret key 123').toString();
}

router.get('/getTranscript', (req, res) => {
  console.log("TRANSCRIPT REQUEST RECEIVED")
  const output = `I'm here to tell you tonight. We believe we're on track to win this election.

 From The New York Times. I'm Michael borrow. This is a daily today. So we'll be going to the US Supreme Court. We want all voting to start. It ain't over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don't want them to find any ballots at

 Four o'clock in the morning and add them to the list. Okay.

 It's going to take time to count the votes. We're going to win, Pennsylvania.

 Alex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.

 I'm here to tell you tonight. We believe we're on track to win this election.

From The New York Times. I'm Michael borrow. This is a daily today. So we'll be going to the US Supreme Court. We want all voting to start. It ain't over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don't want them to find any ballots at

Four o'clock in the morning and add them to the list. Okay.

It's going to take time to count the votes. We're going to win, Pennsylvania.

Alex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.

I'm here to tell you tonight. We believe we're on track to win this election.

From The New York Times. I'm Michael borrow. This is a daily today. So we'll be going to the US Supreme Court. We want all voting to start. It ain't over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don't want them to find any ballots at

Four o'clock in the morning and add them to the list. Okay.

It's going to take time to count the votes. We're going to win, Pennsylvania.

Alex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.

I'm here to tell you tonight. We believe we're on track to win this election.

From The New York Times. I'm Michael borrow. This is a daily today. So we'll be going to the US Supreme Court. We want all voting to start. It ain't over till every vote is counted. Every ballot is counted Joe Biden is calling for patients and President Trump is threatening legal action as millions of votes are still uncounted. We don't want them to find any ballots at

Four o'clock in the morning and add them to the list. Okay.

It's going to take time to count the votes. We're going to win, Pennsylvania.

Alex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election.


  `
  res.send(JSON.stringify(output))
})


router.get('/getTags', (req, res) => {

  axios.get('http://localhost:5000/podcast/timestamp')
  .then(function (response) {
    console.log("success")
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("Failed!!");
    console.log(error.response);
  })
})


export default router;
