"use strict";

var q = require("q");

var ArtistCtrl = require('../controllers/artist');
var LastfmAPI = require('lastfmapi');

var lfm = new LastfmAPI({
  'api_key': '57ee3318536b23ee81d6b27e36997cde'
});

exports.getBioArtist = function (artist) {
  var deferred = q.defer();
  lfm.artist.getInfo({
    'artist': artist.name
  }, function (err, artistlfm) {
    if (err) {
      deferred.reject(err);
    }
    if (artistlfm != null && artistlfm.bio != null) {
      artist.biography = artistlfm.bio.content;
      ArtistCtrl.update(artist).then(function (artistUpdated) {
        deferred.resolve(artistUpdated);
      }).catch(function (err) {
        deferred.reject(err);
      });
    }else{
      deferred.reject(undefined);
    }
  });
  return deferred.promise;
};

exports.getAlbum = function (album) {
  var deferred = q.defer();
  lfm.album.getInfo({
    'album': album.name
  }, function (err, albumlfm) {
    if (err) {
      deferred.reject(err);
    }
    console.log(albumlfm);
    deferred.resolve(albumlfm);
  });
  return deferred.promise;
};

exports.getTrack = function (track) {
  var deferred = q.defer();
  lfm.album.getInfo({
    'track': track.name
  }, function (err, tracklfm) {
    if (err) {
      deferred.reject(err);
    }
    console.log(tracklfm);
    deferred.resolve(tracklfm);
  });
  return deferred.promise;
};
