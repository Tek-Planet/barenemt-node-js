const { Companyfavourites, AspNetUsers } = require("../models");
const { Op } = require("sequelize");

async function getCompanyfavourites(req, res) {
  const { Id } = res?.locals;
  // const Id = "0dc87d5f-9b95-4110-967b-c50dece538ed";
  try {
    const result = await Companyfavourites.findAll({
      where: {
        UserId: Id,
      },
      include: [{ model: AspNetUsers, as: "User" }],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching jobs",
    });
  }
}

// create Favourites
async function createCompanyfavourites(req, res) {
  try {
    const companyfavourites = req.body;

    let result = await Companyfavourites.findOne({
      where: {
        [Op.or]: [
          {
            UserId: companyfavourites.UserId,
            CompanyId: companyfavourites.CompanyId,
          },
          {
            UserId: companyfavourites.CompanyId,
            CompanyId: companyfavourites.UserId,
          },
        ],
      },
    });
    if (result) {
      return res.status(200).json({
        message: "Companyfavourites Exist!!!",
        Companyfavourites: result,
        error: false,
      });
    }

    result = await Companyfavourites.create(companyfavourites);

    return res.status(201).json(result);
  } catch (error) {
    console.log("error creating favourite ", error);
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
}

async function deleteCompanyfavourites(req, res) {
  try {
    const Id = req.params.Id;

    const result = await Companyfavourites.destroy({
      where: {
        Id: Id,
      },
    });

    if (result) {
      res.status(200).json({
        message: "record deleted successfully!!!",
        activity: result,
        error: false,
      });
    } else {
      res.status(400).json({
        message: "Unable to update record",
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

module.exports = {
  getCompanyfavourites,
  createCompanyfavourites,
  deleteCompanyfavourites,
};
