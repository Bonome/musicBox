"use strict";

exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
        error: 'unauthorized'
      });
  }
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
