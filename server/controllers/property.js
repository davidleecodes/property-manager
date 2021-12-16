const Property = require("../models/property");
const Tenant = require("../models/tenant");
const Maintenance = require("../models/maintenance");
const Invoice = require("../models/invoice");
const Lease = require("../models/lease");
const Unit = require("../models/unit");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");
const { removeImage } = require("../utils/cloudinary");
const multer = require("multer");

//@route GET /properties
//get list of properties
exports.getProperties = asyncHandler(async (req, res) => {
  try {
    const propertyList = await Property.find().populate({
      path: "units",
    });
    if (propertyList) {
      res.status(200).json(propertyList);
    } else {
      res.status(404).json({ message: "properties Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route GET /property/:id
//get property for id
exports.getPropertyForId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Property.findById(id);
    property.populate({
      path: "units",
      // select: "name",
    });
    const tenantList = await Tenant.find({ property: id })
      .populate({
        path: "user",
      })
      .populate({
        path: "unit",
      });
    const maintenanceList = await Maintenance.find({ property: id });
    const invoiceList = await Invoice.find({ property: id });
    const leaseList = await Lease.find({ property: id });
    property.set("tenants", tenantList, { strict: false });
    property.set("maintenances", maintenanceList, { strict: false });
    property.set("invoices", invoiceList, { strict: false });
    property.set("leases", leaseList, { strict: false });
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "properties Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route Post /property/new
//post property
exports.newProperty = asyncHandler(async (req, res) => {
  const {
    name,
    street_name,
    street_address,
    state,
    city,
    zip_code,
    country,
    units,
  } = JSON.parse(req.body.data);

  const property = await Property.create({
    name,
    address: {
      street_name,
      street_address,
      city,
      state,
      zip_code,
      country,
    },
  });
  if (req.file) {
    property.image_url = req.file.path;
    await property.save();
  }

  const property_units = await Promise.all(
    units.map(async (u) => {
      let unit = await Unit.create({ name: u, property: property._id });
      return unit._id;
    })
  );
  property.units = property_units;
  await property.save();
  if (property) {
    res.status(201).json({
      success: { property },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});

//@route Patch /property/edit/:id
//patch property
exports.editProperty = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const {
    name,
    street_name,
    street_address,
    state,
    city,
    zip_code,
    country,
    newUnits,
    inputUnits,
    image_url,
  } = JSON.parse(req.body.data);

  const data = {
    name,
    address: {
      street_name,
      street_address,
      city,
      state,
      zip_code,
      country,
    },
    // image_url,
  };
  const property = await Property.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (req.file) {
    if (property.image_url)
      removeImage(property.image_url, "propertyManager/property");
    property.image_url = req.file.path;
    await property.save();
  } else if (property.image_url && !image_url) {
    removeImage(property.image_url, "propertyManager/property");
    property.image_url = null;
    await property.save();
  }

  property.units.forEach((u) => {
    if (inputUnits.every((inU) => inU._id !== u.toString())) {
      Unit.findByIdAndDelete(u.toString());
    }
  });
  property.units = inputUnits;
  await property.save();
  const newPropertyUnits = await Promise.all(
    newUnits.map(async (u) => {
      let unit = await Unit.create({ name: u, property: property._id });
      return unit._id;
    })
  );
  property.units = [...property.units, ...newPropertyUnits];
  await property.save();

  if (property) {
    res.status(201).json({
      success: { property },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});
