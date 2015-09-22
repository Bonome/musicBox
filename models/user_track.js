"use strict";

module.exports = function (sequelize, DataTypes) {
  var UserTracks = sequelize.define('User_Tracks', {
    score: DataTypes.STRING
  });

  return UserTracks;
};