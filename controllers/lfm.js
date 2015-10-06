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

////// Load required packages
//var passport = require('passport');
//var BasicStrategy = require('passport-http').BasicStrategy;
////var LocalStrategy = require('passport-local').Strategy;
//var models = require('../models');
//var bcrypt = require('bcrypt-nodejs');
//
//passport.use(new BasicStrategy(
//        function (username, password, callback) {
//          models.User.find({
//            where: {
//              username: username
//            }
//          }).then(function (user) {
//            // No user found with that username
//            if (!user) {
//              return callback(null, false, {message: "The user is not exist"});
////            } else if (!hashing.compare(password, user.password)){
//            }
////            else if (password !== user.password) {
////              // if password does not match
////              return callback(null, false, {message: "Wrong password"});
////            } else {
////              // if everything is OK, return null as the error
////              // and the authenticated user
////              return callback(null, user);
////            }
//            
//            user.verifyPassword(password, function (err, isMatch) {
////            bcrypt.compare(password, user.password, function (err, isMatch) {
//              if (err) {
//                return callback(err);
//              }
//
//              // Password did not match
//              if (!isMatch) {
//                return callback(null, false, {message: "Wrong password"});
//              }
//
//              // Success
//              return callback(null, user);
//            });
//          }).error(function (err) {
//            callback(err);
//          });
//          // Make sure the password is correct
////            user.verifyPassword(password, function (err, isMatch) {
////              if (err) {
////                return callback(err);
////              }
////
////              // Password did not match
////              if (!isMatch) {
////                return callback(null, false);
////              }
////
////              // Success
////              return callback(null, user);
////            });
////        });
//        }
//));
//exports.isAuthenticated = passport.authenticate('basic', {session: false});
//
//
