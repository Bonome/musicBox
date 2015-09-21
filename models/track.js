"use strict";

module.exports = function (sequelize, DataTypes) {
  var Track = sequelize.define("Track", {
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
    released: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    },
    label: {
      type: DataTypes.STRING
    },
    length: {
      type: DataTypes.STRING
    },
    writer: {
      type: DataTypes.STRING
    },
    composer: {
      type: DataTypes.STRING
    },
    read_counter: {
      type: DataTypes.INTEGER
    },
    last_read_at: {
      type: DataTypes.DATE
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
        return this.belongsToMany(models.Artist, {
//          through: 'Track_Artist'
          as: 'performedBy',
          through: 'Track_Artist', 
          foreignKey: 'Track_id'
        });
      }
    }
  });
  return Track;
};
