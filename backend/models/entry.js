'use strict';
module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('Entry', {
    name: DataTypes.STRING,
    favoriteCity: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Entry;
};