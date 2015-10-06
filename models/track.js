"use strict";

module.exports = function (sequelize, DataTypes) {
  var Track = sequelize.define("Track", {
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
    released: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING,
      unique: true
    },
    label: {
      type: DataTypes.STRING
    },
    track_number: {
      type: DataTypes.STRING
    },
    disc_number: {
      type: DataTypes.STRING
    },
    length: {
      type: DataTypes.STRING
    },
    writer: {
      type: DataTypes.STRING
    },
    composer: {
      type: DataTypes.STRING
    },
    read_counter: {
      type: DataTypes.INTEGER
    },
    last_read_at: {
      type: DataTypes.DATE
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
//          as: 'performed_by',
          through: 'Track_Artists', 
          foreignKey: 'track_id'
        });
        this.belongsToMany(models.Album, {
          as: 'released_on',
          through: 'Track_Albums', 
          foreignKey: 'track_id'
        });
        this.belongsToMany(models.Genre, {
          as: 'is_genre_of',
          through: 'Track_Genres', 
          foreignKey: 'track_id'
        });
        this.belongsToMany(models.Playlist, {
          as: 'compose',
          through: 'Track_Playlists', 
          foreignKey: 'track_id'
        });
        this.belongsToMany(models.User, {
          as: 'track_scored',
          through: 'User_Tracks', 
          foreignKey: 'track_id'
        });
        return this;
      }
    }
  });
  return Track;
};
