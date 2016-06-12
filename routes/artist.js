"use strict";

var express = require('express');
var router = express.Router();
var controller = require('../controllers/artist');

router.get('/', controller.listAlbumArtists);

router.post('/', controller.saveFromRest);

router.put('/', controller.updateFromRest);

router.delete('/', controller.delete);

module.exports = router;