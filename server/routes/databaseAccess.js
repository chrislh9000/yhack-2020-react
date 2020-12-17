import express from 'express';
import crypto from 'crypto';
import models from '../models.js';

const router = express.Router();
const Document = models.Document;
const Test = models.Test;
const axios = require('axios');

var request = require('ajax-request');

const hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

router.post('/test', (req, res) => {
  const newTest = new Test ({
    title: "First Post",
  })

  newTest.save()
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  })
})

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

router.post('/add', (req, res) => {
  const newDoc = new Document({
    title: req.body.title,
    password: hashPassword(req.body.password),
    owner: req.user._id,
    collaborators: [req.user._id],
    content: '',
    history: [],
  });

  newDoc.save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get('/docs', (req, res) => {
  //Document.find({ collaborators: {$in: req.user} })
  Document.find({
    collaborators: { $in: req.user._id }
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/remove', (req, res) => {
  Document.findById(req.body.id)
    .then((doc) => {
      console.log('doc found')
      if (hashPassword(req.body.password) === doc.password) {
        doc.remove()
        .then(() => {
          res.status(200).send({
            success: true,
            message: 'successfully deleted document',
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      } else {
        res.status(412).json({
          success: false,
          message: 'invalid document password',
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post('/update', (req, res) => {
  Document.findById(req.body.id)
    .then((doc) => {
      doc.set({ content: JSON.parse(req.body.history).content,
        history: doc.history.concat(req.body.history) });
      doc.save()
      .then((newDoc) => {
        res.status(200).json(newDoc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});


const isCollaborator = (doc, userId) => {
  for (let i = 0; i < doc.collaborators.length; i += 1) {
    if (doc.collaborators[i].toString() === userId.toString()) {
      return true;
    }
  }

  return false;
};


router.post('/collab', (req, res) => {
  Document.findById(req.body.uri)
    .then((doc) => {
      if (isCollaborator(doc, req.user._id)) {
        res.status(200).json({
          success: false,
          message: 'already a collaborator',
        });
      } else if (doc.collaborators.length < 6) {
        doc.set({ collaborators: doc.collaborators.concat(req.user._id) });
        doc.save((err, newDoc) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json({
              success: true,
              message: 'added as collaborator',
              newDoc: newDoc,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'invalid collaborator',
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
