const { AspNetUsers, QuotesFiles } = require("../models");
const { Op } = require("sequelize");

async function getAllUsers(req, res) {
  try {
    const result = await AspNetUsers.findAll({
      where: {
        Id: "0dc87d5f-9b95-4110-967b-c50dece538ed",
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

async function getLoggedInUser(req, res) {
  const { Id } = res?.locals;
  try {
    const result = await AspNetUsers.findOne({
      where: {
        Id: Id,
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

async function getUser(req, res) {
  const Id = req.params.Id;
  try {
    const result = await AspNetUsers.findOne({
      where: {
        Email: Id,
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

async function updateUser(req, res) {
  try {
    const { Id } = res?.locals;

    const body = req.body;

    console.log("body", req);

    const [count, [updatedRecord]] = await AspNetUsers.update(body, {
      where: {
        Id: Id,
      },
      returning: true, // This option returns the updated record
    });
    if (count > 0 && updatedRecord) {
      // The update was successful, and updatedRecord contains the updated data
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

async function getUserByCategory(req, res) {
  const { categoryId } = req.params;
  const { search = "", zipcode = "" } = req.query;

  try {
    const result = await AspNetUsers.findAll({
      where: {
        categoryId: categoryId,
        [Op.or]: [
          {
            Address: {
              [Op.or]: [
                { [Op.like]: `%${search}%` },
                { [Op.like]: `%${zipcode}%` },
              ],
            },
          },
          {
            ZipCode: {
              [Op.or]: [
                { [Op.like]: `%${search}%` },
                { [Op.like]: `%${zipcode}%` },
              ],
            },
          },
          {
            Country: {
              [Op.or]: [
                { [Op.like]: `%${search}%` },
                { [Op.like]: `%${zipcode}%` },
              ],
            },
          },
        ],
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching users",
    });
  }
}

module.exports = {
  getLoggedInUser,
  getUser,
  updateUser,
  getUserByCategory,
  getAllUsers,
};
