"use strict";

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/',
        passport.authenticate('local-login'),
        function (req, res) {
          // `req.user` contains the authenticated user.
          res.json(req.user);
        });

module.exports = router;
