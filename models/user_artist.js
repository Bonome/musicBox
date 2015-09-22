"use strict";

module.exports = function (sequelize, DataTypes) {
  var UserArtists = sequelize.define('User_Artists', {
    score: DataTypes.STRING
  });

  return UserArtists;
};