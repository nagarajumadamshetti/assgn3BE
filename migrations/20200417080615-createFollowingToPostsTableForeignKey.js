'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Posts', ['userId'], {
      type: 'foreign key',
      name: 'custom_fkey_following_posts',
      references: { //Required field
        table: 'Followings',
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
