'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowRequests = sequelize.define('FollowRequests', {
    userId: DataTypes.INTEGER,
    followRequestUserId: DataTypes.INTEGER,
    followRequestUserName:DataTypes.STRING,
  }, {});
  FollowRequests.associate = function(models) {
    // associations can be defined here
  };
  return FollowRequests;
};