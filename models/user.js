'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status:{ 
      type : DataTypes.BOOLEAN,
      defaultValue : true
    },
    message: DataTypes.TEXT,
    role:{ 
      type : DataTypes.STRING,
      defaultValue : 'member'
    },
    confrim_status : {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }

  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Qoute, { through : 'User_Qoutes'})
  };
  return User;
};