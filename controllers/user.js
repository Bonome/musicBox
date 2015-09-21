"use strict";

var models = require('../models');

exports.list = function (req, res, next) {
  models.User.findAll().then(function (users) {
    res.json(users);
  });
};

exports.create = function (req, res, next) {
  models.User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  }).then(function (user) {
    res.json(user.dataValues);
  }).catch(function (error) {
    console.log("ops: " + error);
    res.status(500).json({
      error: 'error'
    });
  });
};

exports.update = function (req, res) {
  models.User.find({
    where: {
      id: req.body.id
    }
  }).then(function (user) {
    user.updateAttributes({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    }).then(function (user) {
      res.json(user.dataValues);
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
  models.User.find({
    where: {
      id: req.body.id
    }
  }).then(function (user) {
    user.destroy().then(function (user) {
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