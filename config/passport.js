"use strict";

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
//var configDB = require('./database.js');
//var Sequelize = require('sequelize');
//var sequelize = new Sequelize(configDB.url);
//
//var models = sequelize.import('../models');
var models = require('../models');

module.exports = function (passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    models.User.findById(id).then(function (user) {
      done(null, user);
    }).catch(function (e) {
      done(e, false);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    session: true 
  },
          function (req, username, password, done) {
            models.User.findOne({where: {username: username}})
                    .then(function (user) {
                      if (!user) {
                        done(null, false, {message: "Unknown user"});
                      } else if (!user.validPassword(password)) {
                        done(null, false, {message: "Wrong password"});
                      } else {
                        done(null, user);
                      }
                    })
                    .catch(function (e) {
                      done(null, false, {message: 'loginMessage' + e.name + " " + e.message});
                    });
          }));



  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
//  passport.use('local-signup', new LocalStrategy({
//    // by default, local strategy uses username and password, we will override with email
//    usernameField: 'username',
//    passwordField: 'password',
//    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//  },
//          function (req, username, password, done) {
//            //  Whether we're signing up or connecting an account, we'll need
//            //  to know if the email address is in use.
//
//            models.User.findOne({where: {username: username}})
//                    .then(function (existingUser) {
//
//                      // check to see if there's already a user with that email
//                      if (existingUser)
//                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
//
//                      //  If we're logged in, we're connecting a new local account.
//                      if (req.user) {
//                        var user = req.user;
//                        user.username = username;
//                        user.password = models.User.generateHash(password);
//                        user.save().catch(function (err) {
//                          throw err;
//                        }).then(function () {
//                          done(null, user);
//                        });
//                      }
//                      //  We're not logged in, so we're creating a brand new user.
//                      else {
//                        // create the user
//                        var newUser = models.User.build({username: username, password: models.User.generateHash(password)});
//                        newUser.save().then(function () {
//                          done(null, newUser);
//                        }).catch(function (err) {
//                          done(null, false, req.flash('loginMessage', err));
//                        });
//                      }
//                    })
//                    .catch(function (e) {
//                      done(null, false, req.flash('loginMessage', e.name + " " + e.message));
//                    });
//
//          }));
};
