"use strict";

var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', function (req, res) {
    models.Album.findAll().then(function (albums) {
        res.json(albums);
    });
});

router.post('/', function (req, res) {
    models.Album.create({
        name: req.body.name,
        release: req.body.release,
        label: req.body.label,
        artist_id: req.body.artist_id
    }).then(function (albums) {
        res.json(albums.dataValues);
    }).catch(function (error) {
        console.log("ops: " + error);
        res.status(500).json({
            error: 'error'
        });
    });
});

router.put('/', function (req, res) {
    models.Album.find({
        where: {
            id: req.body.id
        }
    }).then(function (album) {
        album.updateAttributes({
            name: req.body.name,
            release: req.body.release,
            label: req.body.label,
            artist_id: req.body.artist_id
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
});

router.delete('/', function (req, res) {
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
});

module.exports = router;