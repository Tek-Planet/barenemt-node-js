"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quotes.belongsTo(models.ADS, {
        foreignKey: "AdId",
        as: "Ads",
      });

      Quotes.hasMany(models.QuotesFiles, {
        foreignKey: "QuoteId",
        as: "FilePath",
      });

      Quotes.hasOne(models.Orders, {
        foreignKey: "QuoteId",
        as: "Order",
      });
    }
  }
  Quotes.init(
    {
      Id: { type: DataTypes.STRING, primaryKey: true },
      OrderDescription: DataTypes.STRING,
      Deadline: DataTypes.DATE,
      UserId: DataTypes.STRING,
      Created: DataTypes.DATE,
      CompanyId: DataTypes.STRING,
      Status: DataTypes.STRING,
      AcceptTime: DataTypes.DATE,
      AdId: DataTypes.STRING,
      PhoneNumber: DataTypes.STRING,
      Email: DataTypes.STRING,
      Comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quotes",
      modelName: "Quotes",
      timestamps: false,
    }
  );
  return Quotes;
};
