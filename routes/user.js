"use strict";

var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');

router.get('/', controller.list);

router.post('/', controller.create);

router.put('/', controller.update);

router.delete('/', controller.delete);

module.exports = router;
