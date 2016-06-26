"use strict";

var fs = require('graceful-fs');
var easyimg = require('easyimage');

var config = require(__dirname + '/../config/config.json');

var self = this;

exports.getAlbumPathRef = function (file) {
    var dirPath = config.musicPath;
    var indexOfLastSlash = file.lastIndexOf("/");
    return file.substring(dirPath.length, indexOfLastSlash);
};

exports.getFilePathRef = function (file) {
    var dirPath = config.musicPath;
    return file.substring(dirPath.length);
};

exports.getFileName = function (file) {
    var dirPath = config.musicPath;
    var indexOfLastSlash = file.lastIndexOf("/");
    var indexOfLastDot = file.lastIndexOf(".");
    return file.substring(indexOfLastSlash + 1, indexOfLastDot);
};

/**
 * 
 * @param {object} entity album_artist or albumt
 * @param {string} type_entity 'artist' or 'album'
 * @param {type} file
 * @returns {undefined}
 */
exports.getImgArtistFromFS = function (entity, file) {
    var thumbnailSize = config.thumbnailSize;
    var indexOfEntity = file.indexOf("/", config.musicPath.length+1);
    var pathOfEntity = file.substring(0, indexOfEntity);
    var absolutPathImg = pathOfEntity + "/artist_" + thumbnailSize + "x" + thumbnailSize + ".jpg";
    var pathImg = file.substring(config.musicPath.length + 1, indexOfEntity) + "/artist_" + thumbnailSize + "x" + thumbnailSize + ".jpg";
    entity.path = pathOfEntity;
    try {
        //check if thumb in good size is here
        fs.statSync(absolutPathImg);
        //set its path
        entity.path_picture = pathImg;
        return entity;
    } catch (e) {
        //it's not
        try {
            //check if original image is here
            absolutPathImg = file.substring(0, indexOfEntity) + "/artist.jpg";
            fs.statSync(absolutPathImg);
            //compute the thumb 
            self.cropImgSquare(absolutPathImg);
            //set its path
            entity.path_picture = pathImg;
            return entity;
        } catch (e) {
            //it's not don't set anything
            return entity;
        }
    }
};

exports.cropImgSquare = function (inputFile, outputPath, newSize) {
    if (newSize == null) {/* or undefined */
        newSize = config.thumbnailSize;
    }
    var outputFile = null;
    if (outputPath == null) {
        var indexOfLastPoint = inputFile.lastIndexOf(".", inputFile);
        outputFile = inputFile.substring(0, indexOfLastPoint) + '_' + newSize + 'x' + newSize + '.jpg';
    }else {
        outputFile = outputPath + "/artist_" + newSize + "x" + newSize + ".jpg";
    }
    easyimg.info(inputFile).then(function (imgInfo) {
        var resizeWidth = newSize;
        var resizeHeight = newSize;
        if (imgInfo.width > imgInfo.height) {
            resizeWidth = imgInfo.width * newSize / imgInfo.height;
        } else if (imgInfo.width < imgInfo.height) {
            resizeHeight = imgInfo.height * newSize / imgInfo.width;
        }
        easyimg.rescrop({
            src: inputFile, dst: outputFile,
            width: resizeWidth, height: resizeHeight,
            cropwidth: newSize, cropheight: newSize
        }).then(
                function (image) {
                    console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                },
                function (err) {
                    console.log(err);
                }
        );
    });
    return outputFile;
};