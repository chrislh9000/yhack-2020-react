import express from "express";
import models from "../models.js";
const router = express.Router();
const User = models.User;
const Pin = models.Pin;
const Podcast = models.Podcast;
const Episode = models.Episode;
const UserEpisode = models.UserEpisode;
const GcloudResponse = models.GcloudResponse;

router.post("/createPodcast", (req, res) => {
  // create a new Pin with timestamp, text, User, and Podcast
  const newPodcast = new Podcast({
    title: req.body.title,
    author: req.body.author,
    about: req.body.about,
    imageUrl: req.body.imageUrl,
    episode: req.body.episode,
    pinDate: new Date(),
  });
  // save to database
  newPodcast
    .save()
    .then((resp) => {
      res.status(200).json({
        success: true,
        message: "created podcast",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/createEpisode", (req, res) => {
  // create a new Pin with timestamp, text, User, and Podcast
  let podcastId = "";
  let transcript;
  Podcast.findOne({
    title: req.body.podcast_title,
    author: req.body.podcast_author,
  }).then((resp) => {
    podcastId = resp._id;
    console.log(resp);
    console.log(podcastId);
    GcloudResponse.findOne({ id: req.body.transcript }).then((resp2) => {
      transcript = resp2._id;
      const newEpisode = new Episode({
        title: req.body.title,
        podcast: podcastId,
        transcript: transcript,
        audioUrl: req.body.audioUrl,
        episode_number: req.body.episode_number,
        date: new Date(),
        summary: req.body.summary,
      });
      // save to database
      newEpisode
        .save()
        .then((resp3) => {
          res.status(200).json({
            success: true,
            message: "created episode",
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  });
});

router.post("/addUserEpisode", (req, res) => {
  const newUserEpisode = new UserEpisode({
    episode: req.body.episode,
  });
  // save to database
  newUserEpisode
    .save()
    .then((resp) => {
      User.findByIdAndUpdate(req.body.userId, { $push: { episodes: resp._id } })
        .then((resp2) => {
          res.status(200).json({
            success: true,
            message: "user episode saved",
          });
        })
        .catch((err) => {
          console.log("======= NO USER FOUND========");
          res.status(500).json(err);
        });
      res.status(200).json({
        success: true,
        message: "created user episode",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/loadUserEpisodes/:userid", (req, res) => {
  User.findById(req.params.userid)
    .then((resp) => {
      UserEpisode.find({ _id: { $in: resp.episodes } })
        .then((resp2) => {
          console.log(resp2);
          res.status(200).json({
            success: true,
            message: resp2,
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
