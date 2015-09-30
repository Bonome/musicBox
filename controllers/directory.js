var models = require("../models");


exports.list = function (req, res) {
    models.Directory.findAll().then(function (directories) {
        res.json(directories);
    });
};

exports.save = function (req, res) {
    models.Directory.findOrCreate({
        name: req.body.name
    }).then(function (directories) {
        res.json(directories.dataValues);
    }).catch(function (error) {
        console.log("ops: " + error);
        res.status(500).json({
            error: 'error'
        });
    });
};

exports.update = function (req, res) {
    models.Directory.find({
        where: {
            id: req.body.id
        }
    }).then(function (directory) {
        directory.updateAttributes({
            name: req.body.name,
            biography: req.body.biography,
            nationality: req.body.nationality,
            label: req.body.label,
            actives_years: req.body.actives_years
        }).then(function (directory) {
            res.json(directory.dataValues);
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
    models.Directory.find({
        where: {
            id: req.body.id
        }
    }).then(function (directory) {
        directory.destroy().then(function () {
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