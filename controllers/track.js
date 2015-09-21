var models = require("../models");


exports.list = function (req, res) {
  models.Track.findAll().then(function (tracks) {
    res.json(tracks);
  });
};

exports.save = function (req, res) {
  models.Track.create({
    name: req.body.name,
    released: req.body.released,
    path: req.body.path,
    label: req.body.label,
    length: req.body.length,
    writer: req.body.writer,
    composer: req.body.composer,
    read_counter: req.body.read_counter,
    last_read_at: req.body.last_read_at
  }).then(function (tracks) {
    res.json(tracks.dataValues);
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