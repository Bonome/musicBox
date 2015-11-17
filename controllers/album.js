"use strict";

var q = require("q");

var lastfm = require('../controllers/lfm');
var artistCtrl = require('../controllers/artist');
var models = require("../models");
var self = this;

exports.list = function (req, res) {
    models.Album.findAll().then(function (albums) {
        res.json(albums);
    });
};

exports.getAlbumsByArtist = function (req, res) {
    models.Album.findAll({
        include: [{
                model: models.Artist,
                required: true,
                where: {
                    name: req.params.artistName
                },
                attributes: []
            }
        ],
        attributes: ['name', 'path_picture']
    }).then(function (albums) {
        artistCtrl.getByName(req.params.artistName)
                .then(function (artist) {
                    res.json({
                        'data': albums,
                        'meta': {
                            'artist': artist
                        }
                    });
                });
    });
};

exports.getByPath = function (path) {
    var deferred = q.defer();
    models.Album.find({
        where: {
            path_ref: path
        }
    }).then(function (album) {
        if (album != null) {
            deferred.resolve(album);
        } else {
            deferred.reject("not found");
        }
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
};

exports.create = function (album) {
    var deferred = q.defer();
    models.Album.create({
        name: album.name,
        release: album.release,
        label: album.label,
        artist_id: album.artist_id,
        path_picture: album.path_picture,
        path_ref: album.path_ref
    }).then(function (albums) {
        deferred.resolve(albums);
    }).catch(function (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            self.getByPath(album.path_ref).then(function (albumdb) {
                deferred.resolve(albumdb);
            }).catch(function (error) {
                console.log("oops album create get : " + error);
                deferred.reject(error);
            });
        } else {
            console.log("oops album create: " + error);
            deferred.reject(error);
        }
    });
    return deferred.promise;
};

exports.save = function (album) {
    var deferred = q.defer();
    self.getByPath(album.path_ref).then(function (albumdb) {
        lastfm.getAlbum(albumdb);
        deferred.resolve(albumdb);
    }).catch(function (err) {
        self.create(album).then(function (albumsaved) {
            lastfm.getAlbum(albumsaved);
            deferred.resolve(albumsaved);
        }).catch(function (err) {
            console.log("oops album save: " + err);
            deferred.reject(err);
        });
    });
    return deferred.promise;
};

exports.saveFromRest = function (req, res) {
    self.save(req.body).then(function (album) {
        res.json(album.dataValues);
    }).catch(function (err) {
        console.log("oops : " + err);
        res.status(500).json(err);
    });
};

exports.update = function (req, res) {
    models.Album.find({
        where: {
            id: req.body.id
        }
    }).then(function (album) {
        album.updateAttributes({
            name: req.body.name,
            release: req.body.release,
            label: req.body.label,
            artist_id: req.body.artist_id,
            path_ref: req.body.path_ref
        }).then(function (album) {
            res.json(album);
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
};