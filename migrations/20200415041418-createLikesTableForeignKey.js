'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Likes', ['postId'], {
      type: 'foreign key',
      name: 'custom_fkey_likes',
      references: { //Required field
        table: 'Posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      
      Example:
      return queryInterface.dropTable('users');
    */
  }
};
