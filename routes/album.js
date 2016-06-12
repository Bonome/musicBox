"use strict";

var express = require('express');
var router = express.Router({mergeParams: true});
var controller = require('../controllers/album');

router.get('/', controller.list);

router.get('/:artistName', controller.getAlbumsByArtist);

router.post('/', controller.create);

router.put('/', controller.update);

router.delete('/', controller.delete);

module.exports = router;