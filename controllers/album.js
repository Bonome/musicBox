"use strict";

var models = require("../models");

exports.list = function (req, res) {
  models.Album.findAll().then(function (albums) {
    res.json(albums);
  });
};

exports.create = function (req, res) {
  models.Album.findOrCreate({
    name: req.body.name,
    release: req.body.release,
    label: req.body.label,
    artist_id: req.body.artist_id,
    path_ref: req.body.path_ref
  }).then(function (albums) {
    res.json(albums.dataValues);
  }).catch(function (error) {
    console.log("ops: " + error);
    res.status(500).json({
      error: 'error'
    });
  });
};

exports.update = function (req, res) {
  models.Album.find({
    where: {
      id: req.body.id
    }
  }).then(function (album) {
    album.updateAttributes({
      name: req.body.name,
      release: req.body.release,
      label: req.body.label,
      artist_id: req.body.artist_id,
      path_ref: req.body.path_ref
    }).then(function (album) {
      res.json(album.dataValues);
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
  models.Album.find({
    where: {
      id: req.body.id
    }
  }).then(function (album) {
    album.destroy().then(function (album) {
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