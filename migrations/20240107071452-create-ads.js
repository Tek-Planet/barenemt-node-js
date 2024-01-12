'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ADs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.STRING
      },
      Title: {
        type: Sequelize.STRING
      },
      AdFor: {
        type: Sequelize.STRING
      },
      CompanyCategoryId: {
        type: Sequelize.INTEGER
      },
      IndividualCategoryId: {
        type: Sequelize.INTEGER
      },
      Ind_subCategoryId: {
        type: Sequelize.INTEGER
      },
      JobType: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.FLOAT
      },
      Description: {
        type: Sequelize.STRING
      },
      Duration: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.STRING
      },
      Created: {
        type: Sequelize.DATE
      },
      JobEndDate: {
        type: Sequelize.DATE
      },
      JobStartDate: {
        type: Sequelize.DATE
      },
      PlaceOfJob: {
        type: Sequelize.STRING
      },
      CompanyName: {
        type: Sequelize.STRING
      },
      ZipCode: {
        type: Sequelize.STRING
      },
      IsHiddenByAdmin: {
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
    await queryInterface.dropTable('ADs');
  }
};