'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowRequests = sequelize.define('FollowRequests', {
    userId: DataTypes.INTEGER,
    followRequestUserId: DataTypes.INTEGER
  }, {});
  FollowRequests.associate = function(models) {
    // associations can be defined here
  };
  return FollowRequests;
};