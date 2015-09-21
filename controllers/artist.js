var models = require("../models");


exports.list = function (req, res) {
    models.Artist.findAll().then(function (artists) {
        res.json(artists);
    });
};

exports.save = function (req, res) {
    models.Artist.create({
        name: req.body.name,
        biography: req.body.biography,
        nationality: req.body.nationality,
        label: req.body.label,
        actives_years: req.body.actives_years
    }).then(function (artists) {
        res.json(artists.dataValues);
    }).catch(function (error) {
        console.log("ops: " + error);
        res.status(500).json({
            error: 'error'
        });
    });
};

exports.update = function (req, res) {
    models.Artist.find({
        where: {
            id: req.body.id
        }
    }).then(function (artist) {
        artist.updateAttributes({
            name: req.body.name,
            biography: req.body.biography,
            nationality: req.body.nationality,
            label: req.body.label,
            actives_years: req.body.actives_years
        }).then(function (artist) {
            res.json(artist.dataValues);
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
    models.Artist.find({
        where: {
            id: req.body.id
        }
    }).then(function (artist) {
        artist.destroy().then(function () {
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