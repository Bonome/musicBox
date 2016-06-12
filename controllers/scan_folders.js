"use strict";

var config = require(__dirname + '/../config/config.json');
var fs = require('fs');
var path = require('path');

var process = require('./process_files');

exports.scan = function (req, res) {
    console.log("scan start time : " + Date());
    var dirPath = config.musicPath;

    var walk = function (dir, done) {
        var results = [];
        fs.readdir(dir, function (err, list) {
            if (err) {
                return done(err);
            }
            var pending = list.length;
            if (!pending) {
                return done(null, results);
            }
            var filesInDirectory = [];
            list.forEach(function (file) {
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function (err, res) {
                            console.log("DIR LIST : " + res);
                            process.parseDirOfFiles(res, function (err, filesWithMetadata) {
                                if (err) {
                                    throw err;
                                }
                                console.log(filesWithMetadata);
//                                BOUCLE et enregistrement d'1 artist d'album, d'1 album et d'autant track et de trackArtist que de morceaux
                            });
//                            results = results.concat(res);
                            if (!--pending) {
                                done(null, results);
                            }
                        });
                    } else {
//                        process.parseFile(file);
                        results.push(file);
                        if (!--pending) {
                            done(null, results);
                        }
                    }
                });
            });

        });
    };
    walk(dirPath, function (err, results) {
        if (err) {
            throw err;
        }
        res.json(true);
    });
};