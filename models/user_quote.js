'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Quote = sequelize.define('User_Quote', {
    QuoteId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    like: DataTypes.BOOLEAN,
    unlike: DataTypes.BOOLEAN
  }, {});
  User_Quote.associate = function(models) {
    // associations can be defined here
  };
  return User_Quote;
};