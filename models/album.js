"use strict";


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
    path_ref: {
      type: DataTypes.STRING,
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
          as: 'released_with',
          through: 'Track_Albums',
          foreignKey: 'album_id'
        });
        return this;
      }
    }
  });
  return Album;
};
