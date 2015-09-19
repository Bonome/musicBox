"use strict";

//var modelArtist = require("../models/artist");

module.exports = function (sequelize, DataTypes) {
    var Album = sequelize.define("Album", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        release: {
            type: DataTypes.STRING
        },
        label: {
            type: DataTypes.STRING
        },
        artist_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Artists",
                key: 'id'
            }
        }
    }, {
        underscored: true,
        paranoid: true,
        hooks: {
            beforeValidate: [
                function () {

                }]
        }
    });
    return Album;
};
