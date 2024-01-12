"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatChannels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatChannels.init(
    {
      Id: { type: DataTypes.STRING, primaryKey: true },
      ChatUserOne: DataTypes.STRING,
      ChatUserTwo: DataTypes.STRING,
      UserOneClearedHistory: DataTypes.BOOLEAN,
      UserTwoClearedHistory: DataTypes.BOOLEAN,
      UserOneDeletedChat: DataTypes.BOOLEAN,
      UserTwoDeletedChat: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ChatChannels",
      timestamps: false,
    }
  );
  return ChatChannels;
};
