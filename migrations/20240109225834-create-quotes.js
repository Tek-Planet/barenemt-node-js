'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.STRING
      },
      OrderDescription: {
        type: Sequelize.STRING
      },
      Deadline: {
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.STRING
      },
      Created: {
        type: Sequelize.DATE
      },
      CompanyId: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING
      },
      AcceptTime: {
        type: Sequelize.DATE
      },
      AdId: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Comment: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Quotes');
  }
};