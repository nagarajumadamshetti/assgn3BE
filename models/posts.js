'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userName:DataTypes.STRING,
  }, {});
  Posts.associate = function (models) {
    // associations can be defined here
    Posts.hasMany(models.Likes,{foreignKey: 'postId'});
    Posts.hasMany(models.Images,{foreignKey: 'postId'});
    Posts.hasMany(models.Comments,{foreignKey: 'postId'});
  };
  return Posts;
};
