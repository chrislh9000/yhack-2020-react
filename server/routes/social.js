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
router.post('/follow', (req, res, next) => {
  console.log("=====SUPPPP=============")
  // update the user object in the database and then return the userschema
  User.findByIdAndUpdate(req.body.user_id, {$push: { friends: req.body.friend_id} })
  .then(user => {
    console.log("FRIEND ADDED TO USER OBJ ======", user)
    res.status(200).json({
      success: true,
      message: user
    });
  })
  .catch(err => {
    console.log("=====HEYYY=============")
    res.status(500).json(err);
  })
})





export default router;
