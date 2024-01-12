const { Quotes, ADS, AspNetUsers, QuotesFiles, Orders } = require("../models");
const { Op } = require("sequelize");

async function getQuotes(req, res) {
  const page = 1,
    pageSize = 10;
  // const { Id } = res?.locals;
  const Id = "136ee843-ce69-4559-bea0-f419cd2cf710";

  try {
    const result = await Quotes.findAll({
      where: {
        [Op.or]: [
          {
            UserId: Id,
          },
          {
            CompanyId: Id,
          },
        ],
      },
      order: [["Created", "DESC"]], // Order by Created column in descending order
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: Orders,
          required: false,
          attributes: ["Status"],
          as: "Order", // Use `required: false` for LEFT JOIN (isouter=True)
        },
        {
          model: ADS,
          required: false,
          as: "Ads", // Use `required: false` for LEFT JOIN (isouter=True)
        },
        {
          model: QuotesFiles,
          required: false, // Use `required: false` for LEFT JOIN (isouter=True)
          as: "FilePath",
        },
      ],
    });

    // get user record for of
    let records = [],
      otherUserId = null;

    for (const record of result) {
      if (record?.dataValues.CompanyId === Id) {
        otherUserId = record?.dataValues.UserId;
      } else {
        otherUserId = record?.dataValues.CompanyId;
      }

      let userRecord = await AspNetUsers.findOne({
        where: {
          Id: otherUserId,
        },
        attributes: ["CompanyName", "Name", "Image"],
      });
      const orderRecord = record?.dataValues;
      const Quote = {
        Id: orderRecord["Id"],
        OrderDescription: orderRecord["OrderDescription"],
        Deadline: orderRecord["Deadline"],
        UserId: orderRecord["UserId"],
        Created: orderRecord["Created"],
        Status: orderRecord["Status"],
        AcceptTime: orderRecord["AcceptTime"],
        AdId: orderRecord["AdId"],
        PhoneNumber: orderRecord["PhoneNumber"],
        Email: orderRecord["Email"],
        Comment: orderRecord["Comment"],
      };
      let Order = record?.dataValues["Order"];

      if (userRecord) {
        records.push({
          ...userRecord?.dataValues,
          Quote,
          Status: Order?.dataValues?.Status ? Order?.dataValues?.Status : null,
          Ads: record?.dataValues["Ads"],
          FilePath: record?.dataValues["FilePath"],
        });
      }
    }

    return res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching jobs",
    });
  }
}

// create new order
async function createQuote(req, res) {
  try {
    const quote = req.body;

    let result = await Quotes.create(quote);

    if (quote.FilePath) {
      const new_quote_file_data = {
        FilePath: quote.FilePath,
        QuoteId: quote.QuoteId,
        Created: quote.Created,
      };

      await QuotesFiles.create(new_quote_file_data);
    }

    // send email notification

    // send push notification

    return res.status(201).json(result);
  } catch (error) {
    console.log("error creating order ", error);
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
}

async function getQuote(req, res) {
  const { Id } = res?.locals;

  const adId = req.params.adId;

  console.log(adId, "DOing this");
  try {
    const result = await Quotes.findOne({
      where: {
        AdId: adId,
        UserId: Id,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "error occured while fetching user",
    });
  }
}

module.exports = {
  getQuotes,
  createQuote,
  getQuote,
};
