import express from 'express';
import models from '../models.js';
const router = express.Router();
const User = models.User;
const Pin = models.Pin;

router.post('/createPin', (req, res) => {
  // create a new Pin with timestamp, text, User, and Podcast
  const newPin = new Pin ({
    text: req.body.text,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    user: req.body.id
  })
  // save to database
  newPin.save()
  .then((resp) => {
    console.log('=====RESP=====', resp._id)
    console.log('=====RESP=====', Object.keys(resp))
    // TO DO: update User to add pin
    User.findByIdAndUpdate(req.body.id, {$push: {pins: resp._id}})
    .then(resp => {
      res.status(200).json({
        success: true,
        message: 'pin saved',
        pinId: resp._id
      });
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })
  .catch((err) => {
    res.status(500).json(err);
  });
})


router.post('/deletePin/:id', (req, res) => {
  Pin.findByIdAndDelete(req.params.id)
  .then((resp) => {
    User.findByIdAndUpdate(req.body.id, {$pull: {pins: req.params.id}})
    .then(resp => {
      res.status(200).json({
        success: true,
        message: 'pin deleted',
      });
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// ====== HANDLE PIN =======
// router.post('/editPin', (req, res) => {
//
// })


router.post('/renderPins', (req, res) => {
  Pin.find({user: req.body.id})
  .then(resp => {
    console.log("===PINS FOUND=====", resp)
    res.status(200).json({
      success: true,
      message: resp
    });
  })
})





export default router
