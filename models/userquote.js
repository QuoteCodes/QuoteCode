'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserQuote = sequelize.define('UserQuote', {
    UserId: DataTypes.INTEGER,
    QuoteId: DataTypes.INTEGER
  }, {});
  UserQuote.associate = function(models) {
    // associations can be defined here
    UserQuote.belongsTo(models.User)
    UserQuote.belongsTo(models.Quote)
    
    UserQuote.belongsToMany(models.User, {through: 'Like'})
  };
  return UserQuote;
};