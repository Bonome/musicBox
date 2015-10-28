"use strict";

module.exports = function (sequelize, DataTypes) {
  var Directory = sequelize.define("Directory", {
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
        this.hasMany(models.Directory, {
          as: 'contains_dir',
          foreignKey: 'directory_id'
        });
        this.hasMany(models.Track, {
          as: 'contains_file',
          foreignKey: 'directory_id'
        });
        return this;
      }
    }
  });
  return Directory;
};
