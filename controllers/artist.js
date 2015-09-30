var models = require("../models");
var q = require("q");
var LastfmAPI = require('lastfmapi');

var lfm = new LastfmAPI({
  'api_key': '57ee3318536b23ee81d6b27e36997cde'
});

var self = this;

exports.list = function (req, res) {
  models.Artist.findAll().then(function (artists) {
    res.json(artists);
  });
};
exports.getByName = function (name) {
  models.Artist.findAll({
    where: {
      name: name
    }
  }).then(function(artist) {
    return artist;
  });
};

exports.save = function (req, res) {
  var deferred = q.defer();
  models.Artist.create({
    name: req.body.name,
    biography: req.body.biography,
    nationality: req.body.nationality,
    label: req.body.label,
    actives_years: req.body.actives_years
  }).then(function (artists) {
    if (artists.biography == null) {
      lfm.artist.getInfo({
        'artist': artists.name
      }, function (err, artist) {
        if (err) {
          throw err;
        }
        artists.biography = artist.bio.content;
        self.update({
          body: artists
        });
      });
    }
    if (res != null) {
      res.json(artists.dataValues);
    } else {
      deferred.resolve(artists.dataValues);
    }
  }).catch(function (error) {
    console.log("ops: " + error);
    if (res != null) {
      res.status(500).json({
        error: 'error'
      });
    } else {
      var a = self.getByName(req.body.name);
      deferred.reject(a);
    }
  });
  return deferred.promise;
};

exports.update = function (req, res) {
  models.Artist.find({
    where: {
      id: req.body.id
    }
  }).then(function (artist) {
    artist.updateAttributes({
      name: req.body.name,
      biography: req.body.biography,
      nationality: req.body.nationality,
      label: req.body.label,
      actives_years: req.body.actives_years
    }).then(function (artist) {
      if (res != null) {
        res.json(artist.dataValues);
      } else {
        return true;
      }
    }).catch(function (error) {
      console.log("ops: " + error);
      if (res != null) {
        res.status(500).json({
          error: 'error'
        });
      } else {
        return false;
      }
    });
  }).catch(function (error) {
    console.log("ops: " + error);
    res.status(500).json({
      error: 'error'
    });
  });
};

exports.delete = function (req, res) {
  models.Artist.find({
    where: {
      id: req.body.id
    }
  }).then(function (artist) {
    artist.destroy().then(function () {
      res.json(true);
    }).catch(function (error) {
      console.log("ops: " + error);
      res.status(500).json({
        error: 'error'
      });
    });
  }).catch(function (error) {
    console.log("ops: " + error);
    res.status(500).json({
      error: 'error'
    });
  });
};