"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuotesFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuotesFiles.init(
    {
      Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      FilePath: DataTypes.STRING,
      QuoteId: DataTypes.STRING,
      Created: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "QuotesFiles",
      tableName: "QuotesFiles",
      timestamps: false,
    }
  );
  return QuotesFiles;
};
