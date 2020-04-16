'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Likes.associate = function(models) {
    // associations can be defined here
  };
  return Likes;
};