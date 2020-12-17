import CryptoJS from 'crypto-js';
const router = express.Router();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import http from 'http';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'pincast',
  api_key: "694445253517932",
  api_secret: "E5veH5IB1VNYkxp3jxEeCM34LCA",
});

router.get('/uploadPodcast', (req, res) => {
  cloudinary.v2.uploader.upload('/Users/chemm/pincast/src/assets/podcasts/election_audio_trimmed.mov',
  {
    "resource_type": "video",
  },
  (error, result) => {
    console.log(result, error);
    // check if podcast is in the database, if not create new podcast schema and add to mongodb
  });
})


router.get('/downloadPodcast', (req, res) => {
  cloudinary.v2.api.resources(
    { resource_type: 'video' },
    function(error, result) {
      console.log(error, result); // retrieve filename from api.resources call
      const url = 'http://res.cloudinary.com/pincast/video/upload/v1608218209/nahkj9w6ct3pucoogjnp.mov'; //retrieve filename from end of url
      const path = '/Users/chemm/pincast/src/assets/podcasts/test_download.mov' // concat filename to path
      const request = http.get(url, function(response) {
        if (response.statusCode === 200) {
          var file = fs.createWriteStream(path);
          response.pipe(file);
        }
        request.setTimeout(120000, function() { // if after 2 minutes file not downlaoded, we abort a request
          request.abort();
        });
        // modify user schema to add the podcast id to downloadedpodcasts
      });
    })
  })







  export default router;
