'use strict';
module.exports = (sequelize, DataTypes) => {
  const Qoute = sequelize.define('Qoute', {
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {});
  Qoute.associate = function(models) {
    // associations can be defined here
    Qoute.belongsToMany(models.User, { through : 'User_Qoutes'})
  };
  return Qoute;
};