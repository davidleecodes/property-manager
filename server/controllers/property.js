const Property = require("../models/property");
const Tenant = require("../models/tenant");
const Maintenance = require("../models/maintenance");
const Invoice = require("../models/invoice");
const Lease = require("../models/lease");
const Unit = require("../models/unit");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

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
  console.log("H");
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
  const { name, address, image_url, units } = req.body;

  const property = await Property.create({
    name,
    address,
    image_url,
  });

  const property_units = await Promise.all(
    units.map(async (u) => {
      let unit = await Unit.create({ name: u, property: property._id });
      console.log(unit);
      return unit._id;
    })
  );
  console.log(property_units);
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
