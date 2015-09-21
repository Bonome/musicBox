"use strict";

var express = require('express');
var router = express.Router();
var controller = require('../controllers/genre');

router.get('/', controller.list);

router.post('/', controller.save);

router.put('/', controller.update);

router.delete('/', controller.delete);

module.exports = router;