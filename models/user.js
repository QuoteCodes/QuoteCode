'use strict';
const Sequelize = require("sequelize")
const Op = Sequelize.Op
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty :{
          msg : "First Name Harus Diisi!"
        },
        is :{
          args : ["^[a-z]+$",'i'],
          msg : "Hanya bisa di isi huruf saja"
        }
      }
    },
    last_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty :{
          msg : "last Name Harus Diisi!"
        },
        is :{
          args : ["^[a-z]+$",'i'],
          msg : "Hanya bisa di isi huruf saja"
        }
      }
    },
    gender: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail: {
          msg : "format email tidak sesuai"
        }
        // isUnique : (email,cb)=>{
        //   User.findOne({
        //     where : { email : email, [Op.ne] : this.dataValues.id  }
        //   })
        //     .then ( email =>{
        //       if(email){
        //         cb('Email sudah pernah didaftarkan')
        //       } else{
        //         cb()
        //       }
        //     })
        // }
      }
    },
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    status: DataTypes.STRING,
    role: DataTypes.STRING
  }, {hooks :{
    beforeValidate : (user)=>{
      user.status = true
      user.role = 'member'
    }
  }});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Quote, {through: 'UserQuote'})
  };
  return User;
};