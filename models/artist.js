"use strict";

var modelTrack = require("../models/track");

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
    }
  }, {
    underscored: true,
    paranoid: true,
    hooks: {
      beforeValidate: [
        function () {

        }]
    },
    classMethods: {
      associate: function (models) {
//        console.log(models);
        return this.belongsToMany(models.Track, {
//          through: 'Track_Artist'
          as: 'performs',
          through: 'Track_Artist',
          foreignKey: 'Artist_id'
        });
      }
    }
  });
  return Artist;
};
