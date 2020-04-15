'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    role: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
    phone: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Posts);
    Users.hasMany(models.Likes);
    Users.hasMany(models.FollowRequests);
    Users.hasMany(models.Following);
    Users.hasMany(models.Followers);
  };
  return Users;
};