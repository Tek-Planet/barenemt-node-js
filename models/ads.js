"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ADS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ADS.init(
    {
      Id: { type: DataTypes.STRING, primaryKey: true },
      Title: DataTypes.STRING,
      AdFor: DataTypes.STRING,
      CompanyCategoryId: DataTypes.INTEGER,
      IndividualCategoryId: DataTypes.INTEGER,
      Ind_subCategoryId: DataTypes.INTEGER,
      JobType: DataTypes.STRING,
      Price: DataTypes.FLOAT,
      Description: DataTypes.STRING,
      Duration: DataTypes.STRING,
      UserId: DataTypes.STRING,
      Created: DataTypes.DATE,
      JobEndtDate: DataTypes.DATE,
      JobStartDate: DataTypes.DATE,
      PlaceOfJob: DataTypes.STRING,
      CompanyName: DataTypes.STRING,
      ZipCode: DataTypes.STRING,
      IsHiddenByAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Set your desired default value here
      },
    },
    {
      sequelize,
      modelName: "ADS",
      timestamps: false,
    }
  );
  return ADS;
};
