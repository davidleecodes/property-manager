const Maintenance = require("../models/maintenance");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");
const { removeImage } = require("../utils/cloudinary");

//@route GET /maintenance
//get list of maintenances
exports.getMaintenances = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const groupId = req.user.group;
  const acctType = req.user.account_type;

  try {
    let query = {
      group: groupId,
    };
    if (acctType === "tenant") {
      const tenant = await Tenant.findOne({ user: userId });
      query.tenant = tenant._id;
    }
    const MaintenaceList = await Maintenance.find(query)
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
  const userId = req.user._id;
  const groupId = req.user.group;
  const acctType = req.user.account_type;
  try {
    let query = {
      _id: id,
      group: groupId,
    };
    if (acctType === "tenant") {
      const tenant = await Tenant.findOne({ user: userId });
      query.tenant = tenant._id;
    }
    console.log(query);
    const maintenance = await Maintenance.findOne(query)
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
  const groupId = req.user.group;

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
    group: groupId,
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

  const { tenant, property, title, body, status, location, media } = JSON.parse(
    req.body.data
  );
  const data = {
    tenant,
    property,
    title,
    body,
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

//@route Delete /maintenance/delete/:id
//delete maintenance
exports.deleteMaintenance = asyncHandler(async (req, res) => {
  console.log("DELETE");
  const maintenanceId = req.params.id;
  const groupId = req.user.group;
  let maintenance;

  if (maintenanceId) {
    maintenance = await Maintenance.findOneAndDelete({
      _id: maintenanceId,
      group: groupId,
    });
  }
  if (!maintenance) {
    res.status(404);
    throw new Error("Invalid requests");
  }

  res.status(200).json({
    success: { maintenance },
  });
});
