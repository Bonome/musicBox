"use strict";

var fs = require('fs');
var mm = require('musicmetadata');

var artistController = require('../controllers/artist');
var albumController = require('../controllers/album');
var trackController = require('../controllers/track');
var utils = require('../controllers/utils');

var self = this;

exports.parseFile = function (file) {

  var parser = mm(fs.createReadStream(file), function (err, metadata) {
    if (!err) {
      var album_artist = {};
      var artist = {};
      var album = {};
      var track = {};
      //if albumartist is present save it
      if (metadata['albumartist'] != null && metadata['albumartist'][0] != null) {
        album_artist.name = metadata['albumartist'][0];
      }
      //if artist is present save it
      if (metadata['artist'] != null && metadata['artist'][0] != null) {
        //if albumartist is not present and artist is present save artist in albumartist
        if (album_artist.name == null) {
          album_artist.name = metadata['artist'][0];
        }
        artist.name = metadata['artist'][0];
      }
      if (artist.name != null) {
        artistController.save(album_artist).then(function (artistSaved) {
          //TODO save album and link with albumartist
          if (metadata['album'] != null) {
            album.name = metadata['album'];
            album.path_ref = utils.getAlbumPathRef(file);
            album.artist_id = artistSaved.id;
            albumController.save(album).then(function (albumSaved) {
              if (album_artist.name !== artist.name) {
                artistController.save(artist).then(function (trackArtistSaved) {
                  track = self.parseTrack(file, metadata);
                  trackController.save(track).then(function (trackSaved) {
                    trackSaved.setArtists(trackArtistSaved);
                    trackSaved.setAlbums(albumSaved);
                  });
                });
              } else {
                track = self.parseTrack(file, metadata);
                trackController.save(track).then(function (trackSaved) {
                  trackSaved.setArtists(artistSaved);
                  trackSaved.setAlbums(albumSaved);
                });
              }
            });
          }
        });
      }
    }
  });
};

exports.parseTrack = function (file, metadata) {
  var track = {};
  if (metadata['title'] != null) {
    track.name = metadata['title'];
  } else {
    track.name = utils.getFileName(file);
  }
  if (metadata['year'] != null) {
    track.released = metadata['year'] + "";
  }
  if (metadata['track'] != null && metadata['track']['no'] != null) {
    track.track_number = metadata['track']['no'] + "";
  }
  if (metadata['disk'] != null && metadata['disk']['no'] != null) {
    track.disc_number = metadata['disk']['no'] + "";
  }
  track.path = file;
  if (metadata['duration'] != null) {
    track.length = metadata['duration'];
  }
  return track;
};