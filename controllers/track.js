"use strict";

var q = require("q");

var models = require("../models");
var lastfm = require('../controllers/lfm');

var self = this;

exports.list = function (req, res) {
  models.Track.findAll().then(function (tracks) {
    res.json(tracks);
  });
};

exports.getByPath = function (path) {
  var deferred = q.defer();
  models.Track.find({
    where: {
      path: path
    }
  }).then(function (track) {
    if (track != null) {
      deferred.resolve(track);
    } else {
      deferred.reject("not found");
    }
  }).catch(function (err) {
    deferred.reject(err);
  });
  return deferred.promise;
};

exports.create = function (track) {
  var deferred = q.defer();
  models.Track.create({
    name: track.name,
    released: track.released,
    path: track.path,
    track_number: track.track_number,
    disc_number: track.disc_number,
    label: track.label,
    length: track.length,
    writer: track.writer,
    composer: track.composer,
    error: track.error
//    read_counter: track.read_counter,
//    last_read_at: track.last_read_at
  }).then(function (track) {
    deferred.resolve(track);
  }).catch(function (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      self.getByPath(track.path).then(function (trackdb) {
        deferred.resolve(trackdb);
      }).catch(function (error) {
        console.log("oops track create get : " + error);
        deferred.reject(error);
      });
    } else {
      console.log("ops track create: " + error);
      deferred.reject(error);
    }
  });
  return deferred.promise;
};

exports.save = function (track) {
  var deferred = q.defer();
  self.getByPath(track.path).then(function (trackdb) {
    lastfm.getTrack(trackdb);
    deferred.resolve(trackdb);
  }).catch(function (err) {
    self.create(track).then(function (tracksaved) {
//      lastfm.getTrack(tracksaved);
      deferred.resolve(tracksaved);
    }).catch(function (err) {
      console.log("oops track save: " + err + track.name);
      deferred.reject(err);
    });
  });
  return deferred.promise;
};

exports.saveFromRest = function (req, res) {
  self.save(req.body).then(function (track) {
    res.json(track.dataValues);
  }).catch(function (error) {
    console.log("ops: " + error);
    res.status(500).json({
      error: 'error'
    });
  });
};

exports.update = function (req, res) {
  models.Track.find({
    where: {
      id: req.body.id
    }
  }).then(function (track) {
    track.updateAttributes({
      name: req.body.name,
      released: req.body.released,
      path: req.body.path,
      label: req.body.label,
      length: req.body.length,
      writer: req.body.writer,
      composer: req.body.composer,
      read_counter: req.body.read_counter,
      last_read_at: req.body.last_read_at
    }).then(function (track) {
      res.json(track.dataValues);
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

exports.delete = function (req, res) {
  models.Track.find({
    where: {
      id: req.body.id
    }
  }).then(function (track) {
    track.destroy().then(function () {
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