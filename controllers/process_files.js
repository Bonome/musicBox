"use strict";

var fs = require('graceful-fs');
var mm = require('musicmetadata');

var artistController = require('../controllers/artist');
var albumController = require('../controllers/album');
var trackController = require('../controllers/track');
var utils = require('../controllers/utils');

var self = this;

/**
 * 
 * @param array listOfFiles
 * @returns {undefined}
 */
exports.parseDirOfFiles = function (listOfFiles, done) {
    var results = {
        album_artist: {},
        album: {},
        track_artist: [],
        tracks: [],
        path_ref: ''
    };
    var pending = 0;
    listOfFiles.forEach(function (file) {
        pending = listOfFiles.length;
        if (!pending) {
            done(null, results);
        }
        if (results.path_ref === '') {
            results.path_ref = file.substring(0, file.lastIndexOf('/')+1);
        }
        mm(fs.createReadStream(file), {duration: true}, function (err, metadata) {
            if (!err) {
                var track = self.parseTrack(file, metadata);
                //processing album_artist
                if (metadata['albumartist'] != null && metadata['albumartist'][0] != null) {
                    if (results.album_artist.name == null && metadata['albumartist'][0] !== '') {
                        results.album_artist.name = metadata['albumartist'][0];
                    } else {
                        if (results.album_artist.name !== metadata['albumartist'][0]) {
                            track.error.album_artist = 'INCOHERENCE : album_artist of this track : ' + metadata['albumartist'][0];
                        }
                    }
                }
                //processing album
                if (metadata['album'] != null) {
                    var track_album = metadata['album'];
                    results.album.path_ref = utils.getAlbumPathRef(file);
                    if (results.album.name == null && track_album !== '') {
                        results.album.name = track_album;
                    } else if (results.album.name == null && track_album === '') {
                        results.album.name = 'Unknown Album';
                    } else {
                        if (track_album === '') {
                            track_album = 'Unknown Album';
                        }
                        if (results.album.name !== track_album) {
                            track.error.album = 'INCOHERENCE : album of this track : ' + track_album;
                        }
                    }
                }
                //processing track_artist
                if (metadata['artist'] != null && metadata['artist'][0] != null) {
                    if (metadata['artist'][0] !== '') {
                        if (results.track_artist.indexOf(metadata['artist'][0]) === -1) {
                            results.track_artist.push(metadata['artist'][0]);
                        }
                        track.track_artist = metadata['artist'][0];
                    } else {
                        if (results.track_artist.indexOf('Unknown Artist') === -1) {
                            results.track_artist.push('Unknown Artist');
                        }
                        track.track_artist = 'Unknown Artist';
                    }
                } else {
                    if (results.track_artist.indexOf('Unknown Artist') === -1) {
                        results.track_artist.push('Unknown Artist');
                    }
                    track.track_artist = 'Unknown Artist';
                }

                results.tracks.push(track);
                if (!--pending) {
                    //Datas stored in ALL files of the current directory are read and stored in results
                    self.saveDirOfFiles(results);
                }
            } else {
                if (!--pending) {
                    //Datas stored in ALL files of the current directory are read and stored in results
                    if (results.tracks.length > 0) {
                        self.saveDirOfFiles(results);
                    }
                }
            }
        });
    });
};

exports.saveDirOfFiles = function (blobInfos) {
    //check if album_artist is empty and fill with artist of first track if it is
    if (blobInfos.album_artist.name == null) {
        blobInfos.album_artist.name = blobInfos.track_artist[0];
    }
    //get the thumbnail for the album artist
    if (blobInfos.album_artist.name !== 'Unknown Artist') {
        blobInfos.album_artist = utils.getImgArtistFromFS(blobInfos.album_artist, blobInfos.path_ref);
    }

    //save album_artist
    artistController.save(blobInfos.album_artist).then(function (albumArtistSaved) {
        //set link between album_artist and album
        blobInfos.album.artist_id = albumArtistSaved.id;
        //save album
        albumController.save(blobInfos.album).then(function (albumSaved) {
            //for each track_artist in this blob
            blobInfos.track_artist.forEach(function (tArtist) {
                //test if the current track_artist is the same than the album artist (we don't save again the artist if it is)
                if (tArtist === albumArtistSaved.name) {
                    //for each tracks we search all these one that have the track artist as the current
                    blobInfos.tracks.forEach(function (track) {
                        if (track.track_artist === tArtist) {
                            trackController.save(track).then(function (trackSaved) {
                                trackSaved.setArtists(albumArtistSaved);
                                trackSaved.setAlbums(albumSaved);
                            });
                        }
                    });
                } else {
                    //save the track_artist
                    artistController.save({name: tArtist}).then(function (trackArtistSaved) {
                        //for each tracks we search all these one that have the track artist as the current
                        blobInfos.tracks.forEach(function (track) {
                            if (track.track_artist === tArtist) {
                                trackController.save(track).then(function (trackSaved) {
                                    trackSaved.setArtists(trackArtistSaved);
                                    trackSaved.setAlbums(albumSaved);
                                });
                            }
                        });
                    });
                }
            });
        });
    });
};

//exports.parseFile = function (file) {
//
//    var parser = mm(fs.createReadStream(file), function (err, metadata) {
//        if (!err) {
//            var album_artist = {};
//            var artist = {};
//            var album = {};
//            var track = {};
//            //if albumartist is present save it
//            if (metadata['albumartist'] != null && metadata['albumartist'][0] != null) {
//                album_artist.name = metadata['albumartist'][0];
//            }
//            //if artist is present save it
//            if (metadata['artist'] != null && metadata['artist'][0] != null) {
//                //if albumartist is not present and artist is present save artist in albumartist
//                if (album_artist.name == null) {
//                    album_artist.name = metadata['artist'][0];
//                }
//                artist.name = metadata['artist'][0];
//            }
//            if (artist.name != null) {
//                album_artist = utils.getImgArtistFromFS(album_artist, file);
//                artistController.save(album_artist).then(function (artistSaved) {
//                    if (metadata['album'] != null) {
//                        album.name = metadata['album'];
//                        album.path_ref = utils.getAlbumPathRef(file);
//                        album.artist_id = artistSaved.id;
//                        albumController.save(album).then(function (albumSaved) {
//                            if (album_artist.name !== artist.name) {
//                                artistController.save(artist).then(function (trackArtistSaved) {
//                                    track = self.parseTrack(file, metadata);
//                                    trackController.save(track).then(function (trackSaved) {
//                                        trackSaved.setArtists(trackArtistSaved);
//                                        trackSaved.setAlbums(albumSaved);
//                                    });
//                                });
//                            } else {
//                                track = self.parseTrack(file, metadata);
//                                trackController.save(track).then(function (trackSaved) {
//                                    trackSaved.setArtists(artistSaved);
//                                    trackSaved.setAlbums(albumSaved);
//                                });
//                            }
//                        });
//                    }
//                });
//            }
//        }
//    });
//};

exports.parseArtist = function (metadata) {

};

exports.parseTrack = function (file, metadata) {
    var track = {
        error: {}
    };
    if (metadata['title'] != null) {
        track.name = metadata['title'];
    } else {
        track.name = utils.getFileName(file);
    }
    if (metadata['year'] != null) {
        track.released = metadata['year'] + "";
    }
    if (metadata['track'] != null && metadata['track']['no'] != null) {
        track.track_number = metadata['track']['no'] + "";
    }
    if (metadata['disk'] != null && metadata['disk']['no'] != null) {
        track.disc_number = metadata['disk']['no'] + "";
    }
    track.path = './data' + utils.getFilePathRef(file);
    if (metadata['duration'] != null) {
        track.length = metadata['duration'];
    }
    return track;
};