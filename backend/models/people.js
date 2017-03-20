'use strict';
module.exports = function(sequelize, DataTypes) {
  var People = sequelize.define('People', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        People.belongsTo(models.Cities)
      }
    }
  });
  return People;
};
