"use strict";

var fs = require('fs');
var mm = require('musicmetadata');
var artistController = require('../controllers/artist');


exports.parseFile = function (file) {

  var parser = mm(fs.createReadStream(file), function (err, metadata) {
    if (!err) {
      var album_artist = {};
      var artist = {};
      if (metadata['albumartist'] != null && metadata['albumartist'][0] != null) {
        album_artist.name = metadata['albumartist'][0];
      }
      if (metadata['artist'] != null && metadata['artist'][0] != null) {
        if (album_artist.name == null) {
          album_artist.name = metadata['artist'][0];
        }
        artist.name = metadata['artist'][0];
      }
      artistController.save({
        body: album_artist
      }).fin(function (artistSaved) {
        console.log(artistSaved);
      });
      if (album_artist.name !== artist.name) {
        artistController.save({
          body: artist
        });
      }
    }
  });
};