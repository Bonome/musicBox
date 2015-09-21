"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password,
        config);
var db = {};

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function (file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

//db.Track.belongsToMany( db.Artist, {
//    as: ['performedBy'],
//    through: ['Track_Artist'], //this can be string or a model,
//    foreignKey: 'Track_id'
//});
//
//db.Artist.belongsToMany(db.Track, {
//    as: ['performs'],
//    through: ['Track_Artist'],
//    foreignKey: 'Artist_id'
//});
//console.log(db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
