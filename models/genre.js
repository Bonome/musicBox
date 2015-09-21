"use strict";

module.exports = function (sequelize, DataTypes) {
    var Genre = sequelize.define("Genre", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
    return Genre;
};
