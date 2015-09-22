"use strict";

module.exports = function (sequelize, DataTypes) {
  var Playlist = sequelize.define("Playlist", {
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
        this.belongsToMany(models.Track, {
          as: 'contain',
          through: 'Track_Playlists',
          foreignKey: 'playlist_id'
        });
        return this;
      }
    }
  });
  return Playlist;
};
