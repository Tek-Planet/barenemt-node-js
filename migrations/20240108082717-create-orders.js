'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.STRING
      },
      AdId: {
        type: Sequelize.STRING
      },
      QuoteId: {
        type: Sequelize.STRING
      },
      Created: {
        type: Sequelize.DATE
      },
      OrderDescription: {
        type: Sequelize.STRING
      },
      DeadLine: {
        type: Sequelize.DATE
      },
      Price: {
        type: Sequelize.FLOAT
      },
      Status: {
        type: Sequelize.STRING
      },
      IsAcceptedByReceiver: {
        type: Sequelize.BOOLEAN
      },
      CancelledBy: {
        type: Sequelize.STRING
      },
      CompletedBy: {
        type: Sequelize.STRING
      },
      CompanyId: {
        type: Sequelize.STRING
      },
      ReceiverId: {
        type: Sequelize.STRING
      },
      CompleteTime: {
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
    await queryInterface.dropTable('Orders');
  }
};