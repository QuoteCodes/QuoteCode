'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    description: DataTypes.STRING
  }, {});
  Quote.associate = function(models) {
    // associations can be defined here
    Quote.belongsToMany(models.User, {through: 'UserQuote'})
  };

  Quote.prototype.giveTags = ()=>{
    return '#'+this.description;
  }

  
  return Quote;
};