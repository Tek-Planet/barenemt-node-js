'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AspNetUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        type: Sequelize.STRING
      },
      Role: {
        type: Sequelize.STRING
      },
      Joined: {
        type: Sequelize.DATE
      },
      Name: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      ZipCode: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      CompanyName: {
        type: Sequelize.STRING
      },
      CompanyDescription: {
        type: Sequelize.STRING
      },
      User_Type: {
        type: Sequelize.STRING
      },
      Education: {
        type: Sequelize.STRING
      },
      Gender: {
        type: Sequelize.STRING
      },
      CV: {
        type: Sequelize.STRING
      },
      CVR: {
        type: Sequelize.STRING
      },
      Att: {
        type: Sequelize.STRING
      },
      AttPerson: {
        type: Sequelize.STRING
      },
      CVExtension: {
        type: Sequelize.STRING
      },
      Experiences: {
        type: Sequelize.STRING
      },
      Ind_Category: {
        type: Sequelize.INTEGER
      },
      Ind_Sub_Category: {
        type: Sequelize.INTEGER
      },
      DOB: {
        type: Sequelize.DATE
      },
      Image: {
        type: Sequelize.STRING
      },
      Country: {
        type: Sequelize.STRING
      },
      LockoutEnabled: {
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
    await queryInterface.dropTable('AspNetUsers');
  }
};