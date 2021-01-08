import express from "express";
import models from "../models.js";
const router = express.Router();
const User = models.User;
const Pin = models.Pin;
const Podcast = models.Podcast;
const Episode = models.Episode;
const UserEpisode = models.UserEpisode;
const GcloudResponse = models.GcloudResponse;

/*
renders all users
*/
router.get('/users/all', (req, res, next) => {
  User.find({}, 'username')
  .then(resp => {
    console.log("ALL USERS ======", resp)
    res.status(200).json({
      success: true,
      message: resp
    });
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

/*
follows a specific user
*/
router.post('/users', (req, res, next) => {

})





export default router;
