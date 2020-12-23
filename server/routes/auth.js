import express from "express";
import models from "../models.js";
const router = express.Router();
import CryptoJS from "crypto-js";
import sha256 from "crypto-js/sha256";
const User = models.User;

function hashPassword(password) {
  return CryptoJS.AES.encrypt(password, "secret key 123").toString();
}

module.exports = (passport) => {
  const validateReq = (userData) => userData.password === userData.password2;
  //======= registration route=======
  router.post("/register", (req, res) => {
    if (!validateReq(req.body)) {
      res.status(401).json({
        success: false,
        message: "passwords do not match",
      });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: sha256(req.body.password).toString(),
      });
      newUser
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: "registration successful",
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  });

  // POST login route
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err || !user) {
        console.log("ERROR===== no user at all");
        res
          .status(500)
          .json({ success: false, message: "err or bad user/pass" });
      } else {
        req.login(user, (err) => {
          if (err) {
            console.log("ERROR===== req login works at least");
            res.status(500).json({ success: false, err: err });
          } else {
            console.log("success bitch");
            res.status(200).json({ success: true, user: req.user });
          }
        });
      }
    })(req, res, next);
  });

  router.get("/crypto", (req, res, next) => {
    console.log(sha256("123").toString());
  });

  return router;
};
