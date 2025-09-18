'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LaborerProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      laborer_id: {
        type: Sequelize.UUID
      },
      skills: {
        type: Sequelize.TEXT
      },
      experience_years: {
        type: Sequelize.INTEGER
      },
      daily_rate: {
        type: Sequelize.DECIMAL
      },
      availability: {
        type: Sequelize.BOOLEAN
      },
      bio: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LaborerProfiles');
  }
};