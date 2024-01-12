const { Orders, ADS, AspNetUsers, QuotesFiles, Reviews } = require("../models");
const { Op } = require("sequelize");

async function getOrders(req, res) {
  const page = 1,
    pageSize = 10;
  const { Id } = res?.locals;
  // const Id = "136ee843-ce69-4559-bea0-f419cd2cf710";

  try {
    const result = await Orders.findAll({
      where: {
        [Op.or]: [
          {
            ReceiverId: Id,
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
        otherUserId = record?.dataValues.ReceiverId;
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
      const Order = {
        Id: orderRecord["Id"],
        AdId: orderRecord["AdId"],
        QuoteId: orderRecord["QuoteId"],
        Created: orderRecord["Created"],
        OrderDescription: orderRecord["OrderDescription"],
        DeadLine: orderRecord["DeadLine"],
        Price: orderRecord["Price"],
        Status: orderRecord["Status"],
        IsAcceptedByReceiver: orderRecord["IsAcceptedByReceiver"],
        CancelledBy: orderRecord["CancelledBy"],
        CompletedBy: orderRecord["CompletedBy"],
        CompanyId: orderRecord["CompanyId"],
        ReceiverId: orderRecord["ReceiverId"],
        CompleteTime: orderRecord["CompleteTime"],
      };
      if (userRecord) {
        records.push({
          ...userRecord?.dataValues,
          Order,
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
async function createOrder(req, res) {
  try {
    const order = req.body;

    let result = await Orders.create(order);

    if (order.FilePath) {
      const new_quote_file_data = {
        FilePath: order.FilePath,
        QuoteId: order.QuoteId,
        Created: order.Created,
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

async function updateOrder(req, res) {
  const { Id } = res?.locals;
  try {
    const body = req.body;

    let order = await Orders.findOne({
      where: {
        Id: body.Id,
      },
    });

    if (order === null) return res.status(404).json("Order Not found");

    if (body.Status === "Completed") {
      if (body.CompanyId !== Id) {
        return res.status(403).json("Not authorized to perform complete order");
      }
    }

    const [count, [updatedRecord]] = await Orders.update(body, {
      where: {
        Id: body.Id,
      },
      returning: true, // This option returns the updated record
    });
    if (count > 0 && updatedRecord) {
      // The update was successful, and updatedRecord contains the updated data
      let receipient = null;
      if (order.CompanyId == Id) receipient = order.ReceiverId;
      else receipient = order.CompanyId;

      // send email notification

      // send push notification

      res.status(200).json(updatedRecord);
    } else {
      // No records were updated
      res.status(404).json({
        message: "Record not found or not updated",
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
      error: true,
    });
  }
}

async function createOrderRating(req, res) {
  try {
    const rating = req.body;

    let result = await Reviews.create(rating);

    const updatedOrder = {
      Id: rating.OrderId,
      Status: "Reviewed",
    };

    await Orders.update(updatedOrder, {
      where: {
        Id: rating.OrderId,
      },
    });

    // send email notification

    // send push notification

    return res.status(201).json(result);
  } catch (error) {
    console.log("error creating order rating ", error);
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
}

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  createOrderRating,
};
