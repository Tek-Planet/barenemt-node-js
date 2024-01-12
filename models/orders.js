"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.ADS, {
        foreignKey: "AdId",
        as: "Ads",
      });

      Orders.belongsTo(models.Quotes, {
        // foreignKey: "QuoteId",
        // as: "Order",
      });

      Orders.hasMany(models.QuotesFiles, {
        foreignKey: "QuoteId",
        as: "FilePath",
      });
    }
  }
  Orders.init(
    {
      Id: { type: DataTypes.STRING, primaryKey: true },
      AdId: DataTypes.STRING,
      QuoteId: DataTypes.STRING,
      Created: DataTypes.DATE,
      OrderDescription: DataTypes.STRING,
      DeadLine: DataTypes.DATE,
      Price: DataTypes.FLOAT,
      Status: DataTypes.STRING,
      IsAcceptedByReceiver: DataTypes.BOOLEAN,
      CancelledBy: DataTypes.STRING,
      CompletedBy: DataTypes.STRING,
      CompanyId: DataTypes.STRING,
      ReceiverId: DataTypes.STRING,
      CompleteTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "Orders",
      timestamps: false,
    }
  );
  return Orders;
};
