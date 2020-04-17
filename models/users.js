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
  
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Posts, { foreignKey: 'userId' });
    Users.hasMany(models.Likes, { foreignKey: 'userId' });
    Users.hasMany(models.FollowRequests, { foreignKey: 'userId' });
    Users.hasMany(models.Following, { foreignKey: 'userId' });
    Users.hasMany(models.Followers, { foreignKey: 'userId' });
  };
  return Users;
};