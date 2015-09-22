"use strict";

var bcrypt = require('bcrypt-nodejs');
var validator = require('validator');

module.exports = function (sequelize, DataTypes) {
  var beforeSave = function (user, options, callback) {
    if (validator.isEmail(user.email)) {
      if (user.changed('password')) {

        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            return sequelize.Promise.reject('Process Error: crypting password failed');
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
              return sequelize.Promise.reject('Process Error: crypting password failed');
            }
            user.setDataValue('password', hash);
            callback(null, user);
          });
        });
      } else {
        return sequelize.Promise.resolve(user);
      }
    } else {
      return sequelize.Promise.reject('Validation Error: invalid email');
    }
  };

  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    paranoid: true,
    hooks: {
      beforeCreate: [
        beforeSave
      ],
      beforeUpdate: [
        beforeSave
      ]
    },classMethods: {
      associate: function (models) {
        this.belongsToMany(models.Track, {
          as: 'scores_track',
          through: 'User_Tracks', 
          foreignKey: 'user_id'
        });
        this.belongsToMany(models.Artist, {
          as: 'scores_artist',
          through: 'User_Artists', 
          foreignKey: 'user_id'
        });
        return this;
      }
    },
    instanceMethods: {
      verifyPassword: function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
          if (err) {
            return cb(err);
          }
          cb(null, isMatch);
        });
      },
      validPassword : function(password) {
				return bcrypt.compareSync(password, this.password);
			}
    }
  });

  return User;
};

