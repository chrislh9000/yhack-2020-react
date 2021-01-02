import express from "express";
import models from "../models.js";
const router = express.Router();
const User = models.User;
const Pin = models.Pin;

// TODO: add episode id
router.post("/createPin", (req, res) => {
  // create a new Pin with timestamp, text, User, and Podcast
  const newPin = new Pin({
    text: req.body.text,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    user: req.body.id,
    ccId: req.body.ccId,
    episode: req.body.episode,
    pinDate: new Date(),
  });
  // save to database
  newPin
    .save()
    .then((resp) => {
      // TO DO: update User to add pin
      User.findByIdAndUpdate(req.body.id, { $push: { pins: resp._id } })
        .then((resp) => {
          console.log("=====PIN SAVED to USER =========");
          console.log("=====PIN SAVED to USER RESP=========", resp);
          res.status(200).json({
            success: true,
            message: "pin saved",
            pinId: resp._id,
          });
        })
        .catch((err) => {
          console.log("======= NO USER FOUND========");
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/deletePin", (req, res) => {
  const query = {
    ccId: req.body.ccId, 
    user: req.body.id,
    // episode: req.body.episode
  }
  
  // Pin.findByIdAndDelete(req.params.id)
    // .then((resp) => {
    //   User.findByIdAndUpdate(req.body.id, { $pull: { pins: req.params.id } })
    //     .then((resp) => {
    //       res.status(200).json({
    //         success: true,
    //         message: "pin deleted",
    //       });
    //     })
    //     .catch((err) => {
    //       res.status(500).json(err);
    //     });
    // })
  Pin.deleteOne(query)
    .then((resp) => {
      console.log(resp)
      res.status(200).json({
        success: true,
        message: "pin deleted",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get episode
router.post("/addNote", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.note);
  Pin.findOneAndUpdate(
    {
      ccId: req.body.ccId,
      user: req.body.id,
      episode: req.body.episode,
    },
    { note: req.body.note }
  )
    .then((resp) => {
      res.status(200).json({
        success: true,
        message: "added note",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ====== EDIT PINS =======
// router.post('/editPin', (req, res) => {
//   Pin.find()
// })

// TODO: render by episode
router.post("/renderPins", (req, res) => {
  Pin.find({ user: req.body.id, episode: req.body.episode }).then((resp) => {
    console.log("=====RESP=====", resp._id);
    console.log("=====RESP=====", Object.keys(resp));
    res.status(200).json({
      success: true,
      message: resp,
      id: resp._id,
    });
  });
});

// ===== PIN CLEARING ROUTES =========
router.get("/clearUserPins/:userid", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userid,
    { $set: { pins: [] } },
    { new: true }
  )
    .then((resp) => {
      res.status(200).json({
        success: true,
        message: "user pins cleared",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
