"use strict";

var config = require(__dirname + '/../config/config.json');

exports.getAlbumPathRef = function(file) {
  var dirPath = config.musicPath;
  var indexOfLastSlash = file.lastIndexOf("/");
  return file.substring(dirPath.length, indexOfLastSlash);
};

exports.getFileName = function(file) {
  var dirPath = config.musicPath;
  var indexOfLastSlash = file.lastIndexOf("/");
  var indexOfLastDot = file.lastIndexOf(".");
  return file.substring(indexOfLastSlash+1, indexOfLastDot);
};