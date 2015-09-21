var models = require("../models");


exports.list = function (req, res) {
    models.Genre.findAll().then(function (genres) {
        res.json(genres);
    });
};

exports.save = function (req, res) {
    models.Genre.create({
        name: req.body.name
    }).then(function (genres) {
        res.json(genres.dataValues);
    }).catch(function (error) {
        console.log("ops: " + error);
        res.status(500).json({
            error: 'error'
        });
    });
};

exports.update = function (req, res) {
    models.Genre.find({
        where: {
            id: req.body.id
        }
    }).then(function (genre) {
        genre.updateAttributes({
            name: req.body.name
        }).then(function (genre) {
            res.json(genre.dataValues);
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
    models.Genre.find({
        where: {
            id: req.body.id
        }
    }).then(function (genre) {
        genre.destroy().then(function () {
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