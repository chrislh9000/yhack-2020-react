'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models.js');

var _models2 = _interopRequireDefault(_models);

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var User = _models2.default.User;

function hashPassword(password) {
  return _cryptoJs2.default.AES.encrypt(password, 'secret key 123').toString();
}

module.exports = function (passport) {
  var validateReq = function validateReq(userData) {
    return userData.password === userData.password2;
  };
  //======= registration route=======
  router.post('/register', function (req, res) {
    if (!validateReq(req.body)) {
      res.status(401).json({
        success: false,
        message: 'passwords do not match'
      });
    } else {
      var newUser = new User({
        username: req.body.username,
        password: hashPassword(req.body.password)
      });
      newUser.save().then(function () {
        res.status(200).json({
          success: true,
          message: 'registration successful'
        });
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }
  });

  // POST login route
  router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (err || !user) {
        res.status(500).json({ success: false, message: 'err or bad user/pass' });
      } else {
        req.login(user, function (err) {
          if (err) {
            res.status(500).json({ success: false, err: err });
          } else {
            res.status(200).json({ success: true, user: req.user });
          }
        });
      }
    })(req, res, next);
  });

  return router;
};