"use strict";

var q = require("q");

var utils = require('../controllers/utils');
var ArtistCtrl = require('../controllers/artist');
var LastfmAPI = require('lastfmapi');

var lfm = new LastfmAPI({
    'api_key': '57ee3318536b23ee81d6b27e36997cde'
});

exports.getArtist = function (artist, path) {
    var deferred = q.defer();
    lfm.artist.getInfo({
        'artist': artist.name
    }, function (err, artistlfm) {
        if (err) {
            deferred.reject(err);
        }
        if (artistlfm != null) {
            var updated = false;
            if (artistlfm.bio != null) {
                artist.biography = artistlfm.bio.content;
                updated = true;
            }
            if (artistlfm.image != null && artistlfm.image.length > 0) {
                var sizeImage = -1; // -1:none, 0:na, 1:small, 2:medium, 3:large, 4:extralarge, 5:mega
                artistlfm.image.forEach(function (image, key) {
                    if (image.size === "mega" && sizeImage < 5) {
                        artist.path_picture = image['#text'];
                        sizeImage = 5;
                    } else if (image.size === "extralarge" && sizeImage < 4) {
                        artist.path_picture = image['#text'];
                        sizeImage = 4;
                    } else if (image.size === "large" && sizeImage < 3) {
                        artist.path_picture = image['#text'];
                        sizeImage = 3;
                    } else if (image.size === "medium" && sizeImage < 2) {
                        artist.path_picture = image['#text'];
                        sizeImage = 2;
                    } else if (image.size === "small" && sizeImage < 1) {
                        artist.path_picture = image['#text'];
                        sizeImage = 1;
                    } else if (sizeImage < 0) {
                        artist.path_picture = image['#text'];
                        sizeImage = 0;
                    }
                });
                if (path != null) {
                    artist.path_picture = utils.cropImgSquare(artist.path_picture, path);
                }
                updated = true;
            }
            if (updated) {
                ArtistCtrl.update(artist).then(function (artistUpdated) {
                    deferred.resolve(artistUpdated);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.reject(undefined);
            }
        } else {
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
