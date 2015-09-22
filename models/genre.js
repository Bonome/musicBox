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
    },
    classMethods: {
      associate: function (models) {
        this.belongsToMany(models.Artist, {
          as: 'plays_by',
          through: 'Artist_Genres',
          foreignKey: 'genre_id'
        });
        this.belongsToMany(models.Track, {
          as: 'has',
          through: 'Track_Genres',
          foreignKey: 'genre_id'
        });
        return this;
      }
    }
  });
  return Genre;
};
