'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    weibo: DataTypes.STRING,
    weixin: DataTypes.STRING,
    receive_remote: DataTypes.BOOLEAN,
    email_verifyed: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};