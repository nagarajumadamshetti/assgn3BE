'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    commentedUserName: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};