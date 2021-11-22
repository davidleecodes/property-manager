const Maintenance = require("../models/maintenance");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /properties
//get list of properties
exports.getMaintenances = asyncHandler(async (req, res) => {
  console.log("req");
  try {
    const MaintenaceList = await Maintenance.find().populate({
      path: "tenant",
      populate: {
        path: "user",
      },
    });
    console.log(MaintenaceList);
    if (MaintenaceList) {
      res.status(200).json({ maintenance: MaintenaceList });
    } else {
      res.status(404).json({ message: "Maintenace Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
