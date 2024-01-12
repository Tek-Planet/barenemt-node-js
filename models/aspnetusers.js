"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AspNetUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AspNetUsers.init(
    {
      Id: { type: DataTypes.STRING, primaryKey: true },
      Email: DataTypes.STRING,
      PhoneNumber: DataTypes.STRING,
      Role: DataTypes.STRING,
      Joined: DataTypes.DATE,
      Name: DataTypes.STRING,
      Address: DataTypes.STRING,
      ZipCode: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      CompanyName: DataTypes.STRING,
      CompanyDescription: DataTypes.STRING,
      User_Type: DataTypes.STRING,
      Education: DataTypes.STRING,
      Gender: DataTypes.STRING,
      CV: DataTypes.STRING,
      CVR: DataTypes.STRING,
      Att: DataTypes.STRING,
      AttPerson: DataTypes.STRING,
      CVExtension: DataTypes.STRING,
      Experiences: DataTypes.STRING,
      Ind_Category: DataTypes.INTEGER,
      Ind_Sub_Category: DataTypes.INTEGER,
      DOB: DataTypes.DATE,
      Image: DataTypes.STRING,
      Country: DataTypes.STRING,
      LockoutEnabled: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "AspNetUsers",
      tableName: "AspNetUsers",
      timestamps: false,
    }
  );
  return AspNetUsers;
};
