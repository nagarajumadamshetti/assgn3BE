'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Posts.associate = function (models) {
    // associations can be defined here
    Posts.hasMany(models.Likes,{foreignKey: 'postId'});
    Posts.hasMany(models.Images,{foreignKey: 'postId'});
  };
  return Posts;
};
