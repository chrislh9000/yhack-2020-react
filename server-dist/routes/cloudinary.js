'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


_cloudinary2.default.config({
  cloud_name: 'pincast',
  api_key: "694445253517932",
  api_secret: "E5veH5IB1VNYkxp3jxEeCM34LCA"
});

router.get('/uploadPodcast', function (req, res) {
  _cloudinary2.default.v2.uploader.upload('/Users/chemm/pincast/src/assets/podcasts/election_audio_trimmed.mov', {
    "resource_type": "video"
  }, function (error, result) {
    console.log(result, error);
    // check if podcast is in the database, if not create new podcast schema and add to mongodb
  });
});

router.get('/downloadPodcast:podcastid', function (req, res) {
  _cloudinary2.default.v2.api.resources({ resource_type: 'video' }, function (error, result) {
    console.log(error, result); // retrieve filename from api.resources call
    var url = 'http://res.cloudinary.com/pincast/video/upload/v1608218209/nahkj9w6ct3pucoogjnp.mov'; //retrieve filename from end of url
    var path = '/Users/chemm/pincast/src/assets/podcasts/test_download.mov'; // concat filename to path
    var request = _http2.default.get(url, function (response) {
      if (response.statusCode === 200) {
        var file = _fs2.default.createWriteStream(path);
        response.pipe(file);
      }
      request.setTimeout(120000, function () {
        // if after 2 minutes file not downlaoded, we abort a request
        request.abort();
      });
      // modify user schema to add the podcast id to downloadedpodcasts
    });
  });
});

router.get('/deletePodcast:podcastid', function (req, res) {
  // TODO: delete podcast from local app storage


  // TODO: update user schema's downloadedpodcasts and delete the podcast
});

exports.default = router;