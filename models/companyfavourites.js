"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Companyfavourites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Companyfavourites.belongsTo(models.AspNetUsers, {
        foreignKey: "CompanyId",
        as: "User",
      });
    }
  }
  Companyfavourites.init(
    {
      Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      CompanyId: DataTypes.STRING,
      UserId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Companyfavourites",
      timestamps: false,
    }
  );
  return Companyfavourites;
};
