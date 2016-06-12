"use strict";

var express = require('express');
var router = express.Router({mergeParams: true});
var controller = require('../controllers/track');
var auth = require('../controllers/auth');

router.get('/', auth.isLoggedIn, controller.list);

router.get('/:albumName', controller.getTracksByAlbum);

router.post('/', controller.save);

router.put('/', controller.update);

router.delete('/', controller.delete);

module.exports = router;

// route middleware to ensure user is logged in
