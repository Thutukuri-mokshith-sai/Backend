'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating_id: {
        type: Sequelize.UUID
      },
      rater_id: {
        type: Sequelize.UUID
      },
      rated_id: {
        type: Sequelize.UUID
      },
      job_id: {
        type: Sequelize.UUID
      },
      rating: {
        type: Sequelize.INTEGER
      },
      review: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Ratings');
  }
};