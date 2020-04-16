'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
    userId: DataTypes.INTEGER,
    followersUserId: DataTypes.INTEGER,
    followersUserName:DataTypes.STRING
  }, {});
  Followers.associate = function(models) {
    // associations can be defined here
  };
  return Followers;
};