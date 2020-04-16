'use strict';
module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    userId: DataTypes.INTEGER,
    followingUserId: DataTypes.INTEGER,
    followingUserName:DataTypes.STRING,
  }, {});
  Following.associate = function(models) {
    // associations can be defined here
  };
  return Following;
};