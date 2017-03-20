'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cities = sequelize.define('Cities', {
    favoriteCity: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Cities.hasMany(models.People)
      }
    }
  });
  return Cities;
};
