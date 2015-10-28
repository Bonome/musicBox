"use strict";

var q = require("q");

var models = require("../models");
var lastfm = require('../controllers/lfm');

var self = this;

exports.list = function (req, res) {
  models.Artist.findAll().then(function (artists) {
    res.json(artists);
  });
};

exports.getByName = function (name) {
  var deferred = q.defer();
  models.Artist.find({
    where: {
      name: name
    }
  }).then(function (artist) {
    if (artist != null) {
      deferred.resolve(artist);
    } else {
      deferred.reject("not found");
    }
  }).catch(function (err) {
    deferred.reject(err);
  });
  return deferred.promise;
};

exports.create = function (artist) {
  var deferred = q.defer();
  models.Artist.create({
    name: artist.name,
    biography: artist.biography,
    nationality: artist.nationality,
    label: artist.label,
    actives_years: artist.actives_years
  }).then(function (artist) {
    deferred.resolve(artist);
  }).catch(function (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      self.getByName(artist.name).then(function (artistdb) {
        deferred.resolve(artistdb);
      }).catch(function (error) {
        console.log("oops artist create get : " + error);
        deferred.reject(err);
      });
    } else {
      console.log("oops artist create : " + err);
      deferred.reject(err);
    }
  });
  return deferred.promise;
};

exports.save = function (artist) {
  var deferred = q.defer();
  //check if artist is in db
  self.getByName(artist.name).then(function (artist) {
    //if it is, test biography field, get and add if not 
    if (artist.biography == null) {
      lastfm.getBioArtist(artist.dataValues);
    }
    //return artist in db
    deferred.resolve(artist);
  }).catch(function (err) {
    //if artist isn't in db save it
    self.create(artist).then(function (artist) {
      //test biography field, get and add if not 
      if (artist.biography == null) {
        lastfm.getBioArtist(artist.dataValues);
      }
      //return artist saved in db
      deferred.resolve(artist);
    }).catch(function (error) {
      console.log("oops artist save : " + error);
      deferred.reject(error);
    });
  });
  return deferred.promise;
};

exports.saveFromRest = function (req, res) {
  self.save(req.body).then(function (artist) {
    res.json(artist.dataValues);
  }).catch(function (err) {
    res.status(500).json({
      error: 'error during creation'
    });
  });
};

exports.update = function (artist) {
  var deferred = q.defer();
  models.Artist.update({
    name: artist.name,
    biography: artist.biography,
    nationality: artist.nationality,
    label: artist.label,
    actives_years: artist.actives_years
  }, {
    where: {
      id: artist.id
    }
  }).then(function (artistUpdated) {
    deferred.resolve(artistUpdated);
  }).catch(function (err) {
    deferred.reject(err);
  });
  return deferred.promise;
};

exports.updateFromRest = function (req, res) {
  self.update(req.body).then(function (artist) {
    res.json(artist.dataValues);
  }).catch(function (err) {
    res.status(500).json({
      error: 'error during update'
    });
  });
};

exports.delete = function (req, res) {
  models.Artist.find({
    where: {
      id: req.body.id
    }
  }).then(function (artist) {
    artist.destroy().then(function () {
      res.json(true);
    }).catch(function (error) {
      console.log("ops: " + error);
      res.status(500).json({
        error: 'error'
      });
    });
  }).catch(function (error) {
    console.log("ops: " + error);
    res.status(500).json({
      error: 'error'
    });
  });
};