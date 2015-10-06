"use strict";

var express = require('express');
var router = express.Router();
var controller = require('../controllers/artist');

router.get('/', controller.list);

router.post('/', controller.saveFromHttp);

router.put('/', controller.updateFromHttp);

router.delete('/', controller.delete);

module.exports = router;