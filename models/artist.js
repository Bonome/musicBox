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
    path_picture: {
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
        this.belongsToMany(models.Track, {
          as: 'performs',
          through: 'Track_Artists',
          foreignKey: 'artist_id'
        });
        this.belongsToMany(models.Genre, {
          as: 'plays',
          through: 'Artist_Genres',
          foreignKey: 'artist_id'
        });
        this.belongsToMany(models.Artist, {
          as: 'influence_by',
          through: 'Artist_Influence_Artists',
          foreignKey: 'artist_id'
        });
        this.belongsToMany(models.Artist, {
          as: 'similaire_to',
          through: 'Artist_Similaire_Artists',
          foreignKey: 'artist_id'
        });
        this.belongsToMany(models.User, {
          as: 'artist_scored',
          through: 'User_Artists', 
          foreignKey: 'artist_id'
        });
        this.hasMany(models.Album, {
          as: 'released',
          foreignKey: 'artist_id'
        });
        return this;
      }
    }
  });
  return Artist;
};
