"use strict";
module.exports = function (sequelize, DataTypes) {
    var Artist = sequelize.define("Artist", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        biography: {
            type: DataTypes.TEXT
        },
        nationality: {
            type: DataTypes.STRING
        },
        label: {
            type: DataTypes.STRING
        },
        actives_years: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
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
    return Artist;
};
