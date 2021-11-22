const Property = require("../models/property");
const Tenant = require("../models/tenant");
const Maintenance = require("../models/maintenance");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /properties
//get list of properties
exports.getProperties = asyncHandler(async (req, res) => {
  console.log("req");
  try {
    const propertyList = await Property.find();
    console.log(propertyList);
    if (propertyList) {
      res.status(200).json(propertyList);
    } else {
      res.status(404).json({ message: "properties Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

exports.getPropertyForId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  console.log("req", id);
  try {
    const property = await Property.findById(id);
    const tenantList = await Tenant.find({ property: id });
    const maintenanceList = await Maintenance.find({ property: id });
    property.set("tenants", tenantList, { strict: false });
    property.set("maintenaces", maintenanceList, { strict: false });
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "properties Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
