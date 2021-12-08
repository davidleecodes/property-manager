const Maintenance = require("../models/maintenance");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /maintenance
//get list of maintenances
exports.getMaintenances = asyncHandler(async (req, res) => {
  try {
    const MaintenaceList = await Maintenance.find()
      .populate({
        path: "tenant",
        populate: [{ path: "user" }, { path: "unit" }],
      })

      .populate({
        path: "property",
      });
    if (MaintenaceList) {
      res.status(200).json(MaintenaceList);
    } else {
      res.status(404).json({ message: "Maintenace Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route GET /maintenance/:id
//get maintenance for id
exports.getMaintenanceForId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const maintenance = await Maintenance.findById(id)
      .populate({
        path: "tenant",
        populate: [{ path: "user" }, { path: "unit" }],
      })
      .populate({
        path: "property",
      });

    if (maintenance) {
      res.status(200).json(maintenance);
    } else {
      res.status(404).json({ message: "maintenance Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
