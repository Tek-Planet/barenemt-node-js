const { ChatChannels, AspNetUsers, Chat } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

async function getChatChannels(req, res) {
  const { Id } = res?.locals;
  // const Id = "136ee843-ce69-4559-bea0-f419cd2cf710";
  try {
    const result = await ChatChannels.findAll({
      where: {
        [Op.or]: [
          {
            ChatUserOne: Id,
          },
          {
            ChatUserTwo: Id,
          },
        ],
      },
    });
    // loop through and get the record
    let inbox = [],
      otherUserId = null;
    for (const record of result) {
      if (record.ChatUserOne === Id) {
        otherUserId = record.ChatUserTwo;
      } else {
        otherUserId = record.ChatUserOne;
      }

      // use otherUserId to get  user record

      let userRecord = await AspNetUsers.findOne({
        where: {
          Id: otherUserId,
        },
        attributes: ["Id", "CompanyName", "Name", "Image"],
      });
      if (userRecord) {
        inbox.push({ ...userRecord?.dataValues, InboxId: record.Id });
      }
    }
    return res.status(200).json(inbox);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching jobs",
    });
  }
}

// get all chats

async function getChats(req, res) {
  const { Id } = req.params;
  try {
    const result = await Chat.findAll({
      where: {
        ChannelId: Id,
      },
      order: [["SentTime", "ASC"]], // Order by Created column in descending order
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred while fetching jobs",
    });
  }
}
// create new chat
async function createChat(req, res) {
  try {
    const chat = req.body;

    let result = await Chat.create(chat);

    return res.status(201).json(result);
  } catch (error) {
    console.log("error creating chat ", error);
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
}

// create Favourites
async function getChatChannel(req, res) {
  try {
    const { Id } = res?.locals;
    // const Id = "136ee843-ce69-4559-bea0-f419cd2cf710";
    const { userId } = req.params;

    let result = await ChatChannels.findOne({
      where: {
        [Op.or]: [
          {
            ChatUserOne: Id,
            ChatUserTwo: userId,
          },
          {
            ChatUserOne: userId,
            ChatUserTwo: Id,
          },
        ],
      },
      attributes: ["Id"],
    });
    // if the chat exist create
    if (result) {
      return res.status(200).json(result.Id);
    }

    // result = await ChatChannels.create(chatChannels);

    const newInbox = (new_channel_data = {
      ChatUserOne: Id,
      ChatUserTwo: userId,
      Id: uuidv4(),
      UserOneClearedHistory: false,
      UserOneDeletedChat: false,
      UserTwoClearedHistory: false,
      UserTwoDeletedChat: false,
    });

    //  add the new record

    await ChatChannels.create(newInbox);

    return res.status(201).json(newInbox.Id);
  } catch (error) {
    console.log("error creating new chat channel", error);
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
}

module.exports = {
  getChatChannels,
  getChats,
  getChatChannel,
  createChat,
};
