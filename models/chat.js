"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init(
    {
      Id: DataTypes.STRING,
      ChannelId: DataTypes.STRING,
      SenderId: DataTypes.STRING,
      Message: DataTypes.STRING,
      SentTime: DataTypes.DATE,
      File: DataTypes.STRING,
      read: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "Chat",
      timestamps: false,
    }
  );
  return Chat;
};
