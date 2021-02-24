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
            message: newPin,
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
    episode: req.body.episode,
  };

  Pin.findOneAndDelete(query)
    .then((resp) => {
      console.log("deleted Pin", resp);
      res.status(200).json({
        success: true,
        message: resp,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get episode
router.post("/addNote", (req, res) => {
  console.log(req.body.note);
  console.log(req.body.episode);
  console.log(req.body.id);
  console.log(req.body.ccId);
  Pin.findOneAndUpdate(
    {
      ccId: req.body.ccId,
      user: req.body.id,
      episode: req.body.episode,
    },
    { note: req.body.note }
  )
    .then((resp) => {
      console.log("RESP========", resp);
      res.status(200).json({
        success: true,
        message: "added note",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/friendPin", (req, res) => {
  Pin.find({
    $and: [{ user: { $in: req.body.friends } }, { episode: req.body.episode }],
  })
    .populate("user")
    .then((resp) => {
      console.log("====QUERY FRO FRIENDS PINS WORKED====");
      res.status(200).json({
        success: true,
        message: resp,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ====== EDIT PINS =======
router.post("/editPin", (req, res) => {
  const query = {
    ccId: req.body.ccId,
    user: req.body.id,
    episode: req.body.episode,
  };
  const newTime = {
    text: req.body.text,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    ccId: req.body.newCcId,
  };

  Pin.findOneAndUpdate(query, newTime)
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

router.post("/pinFavorite", (req, res) => {
  const query = {
    ccId: req.body.ccId,
    user: req.body.user_id,
    episode: req.body.episode,
  };
  const fav = {
    favorited: req.body.favorite,
  };

  Pin.findOneAndUpdate(query, fav)
    .then((resp) => {
      res.status(200).json({
        success: true,
        message: "favorite changed",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// TODO: render by episode
router.post("/renderPins", (req, res) => {
  console.log("=======RENDER PINS USER ID=======", req.body.user_id);
  console.log("=======RENDER PINS EPISODE ID=======", req.body.episode);
  Pin.find({ user: req.body.user_id, episode: req.body.episode }).then(
    (resp) => {
      console.log("=====RESP=====", resp._id);
      console.log("=====RESP=====", Object.keys(resp));
      res.status(200).json({
        success: true,
        message: resp,
        id: resp._id,
      });
    }
  );
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
