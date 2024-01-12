const { ADS } = require("../models");
const { Op } = require("sequelize");

async function getAds(req, res) {
  const page = 1,
    pageSize = 10;
  const { Id } = res?.locals;
  try {
    const result = await ADS.findAll({
      where: {
        UserId: Id,
      },
      order: [["Created", "DESC"]], // Order by Created column in descending order
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching jobs",
    });
  }
}

async function getOpenAds(req, res) {
  const { search = "", zipcode = "" } = req.query;

  const page = 1,
    pageSize = 10;
  const { Id } = res?.locals;
  // const Id = "136ee843-ce69-4559-bea0-f419cd2cf710",
  const Roles = "Company";

  try {
    let result = await ADS.findAll({
      where: {
        UserId: {
          [Op.not]: Id, // UserId not equal to current user Id
        },
        AdFor: Roles, // AdFor equal to current user Role
        JobEndtDate: {
          [Op.gt]: new Date(), // JobEndtDate greater than current date
        },
        [Op.or]: [
          {
            Title: {
              [Op.or]: [
                { [Op.like]: `%${search}%` },
                { [Op.like]: `%${zipcode}%` },
              ],
            },
          },
          {
            PlaceOfJob: {
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
        ],
      },
      order: [["Created", "DESC"]], // Order by Created column in descending order
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching jobs",
    });
  }
}

// create Adds
async function createAds(req, res) {
  try {
    const ads = req.body;

    // let result = await Ads.findOne({
    //   where: {
    //     name: ads.name,
    //     projectId: ads.projectId,
    //   },
    // });
    // if (result) {
    //   return res.status(200).json({
    //     message: "ads Exist!!!",
    //     ads: result,
    //     error: false,
    //   });
    // }

    let result = await ADS.create(ads);

    return res.status(201).json(result);
  } catch (error) {
    console.log("error creating activity ", error);
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
}

// updateAds
async function updateAds(req, res) {
  try {
    const body = req.body;

    const Id = req.body.Id;
    const [count, [updatedRecord]] = await ADS.update(body, {
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

async function deleteAds(req, res) {
  try {
    const Id = req.params.Id;

    const result = await ADS.destroy({
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
  getAds,
  getOpenAds,
  createAds,
  updateAds,
  deleteAds,
};
