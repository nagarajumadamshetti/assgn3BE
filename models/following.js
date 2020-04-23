'use strict';
module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    userId: DataTypes.INTEGER,
    followingUserId: DataTypes.INTEGER,
    followingUserName:DataTypes.STRING,
  }, {});
  Following.associate = function(models) {
    // associations can be defined here
    Following.belongsTo(models.Users,{foreignKey:'followingUserId' ,as:'followingUser'})
    Following.belongsTo(models.Users, { foreignKey: 'userId', as :'user'});
  };
  return Following;
};
