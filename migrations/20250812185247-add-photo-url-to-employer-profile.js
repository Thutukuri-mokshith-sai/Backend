'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('EmployerProfiles', 'photo_url', {
      type: Sequelize.STRING,
      allowNull: true,  // allow null if photo is optional
      comment: 'URL to employer photo or logo',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('EmployerProfiles', 'photo_url');
  }
};
