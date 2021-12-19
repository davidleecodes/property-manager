const Maintenance = require("../models/maintenance");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");
const { removeImage } = require("../utils/cloudinary");

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
        populate: { path: "units" },
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

//@route Post /maintenance/new
//post maintenance
exports.newMaintenance = asyncHandler(async (req, res) => {
  const { tenant, property, title, body, status, location } = JSON.parse(
    req.body.data
  );

  const maintenance = await Maintenance.create({
    tenant,
    property,
    title,
    body,
    status,
    location,
  });
  if (req.files) {
    let files = req.files.map((f) => f.path);
    maintenance.media = files;
    await maintenance.save();
  }
  if (maintenance) {
    res.status(201).json({
      success: { maintenance },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});

//@route Patch /maintenance/edit/:id
//patch maintenance
exports.editMaintenance = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { tenant, property, issue, status, location, media } = JSON.parse(
    req.body.data
  );
  const data = {
    tenant,
    property,
    issue,
    status,
    location,
  };

  const maintenance = await Maintenance.findByIdAndUpdate(id, data, {
    new: true,
  });

  //maintenance has old media, remove images comparing to media in req
  maintenance.media.forEach((m) => {
    if (!media.includes(m)) {
      removeImage(m, "propertyManager/maintenance");
    }
  });
  maintenance.media = media;
  await maintenance.save();

  if (req.files) {
    let files = req.files.map((f) => f.path);
    maintenance.media = [...maintenance.media, ...files];
    await maintenance.save();
  }

  if (maintenance) {
    res.status(201).json({
      success: { maintenance },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});
