'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChatChannels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.STRING
      },
      ChatUserOne: {
        type: Sequelize.STRING
      },
      ChatUserTwo: {
        type: Sequelize.STRING
      },
      UserOneClearedHistory: {
        type: Sequelize.BOOLEAN
      },
      UserTwoClearedHistory: {
        type: Sequelize.BOOLEAN
      },
      UserOneDeletedChat: {
        type: Sequelize.BOOLEAN
      },
      UserTwoDeletedChat: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('ChatChannels');
  }
};