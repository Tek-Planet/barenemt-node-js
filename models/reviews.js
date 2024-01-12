"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reviews.init(
    {
      Id: { type: DataTypes.STRING, primaryKey: true },
      OrderId: DataTypes.STRING,
      Created: DataTypes.DATE,
      Review: DataTypes.STRING,
      CompanyId: DataTypes.STRING,
      UserId: DataTypes.STRING,
      Rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reviews",
      tableName: "Reviews",
      timestamps: false,
    }
  );
  return Reviews;
};
