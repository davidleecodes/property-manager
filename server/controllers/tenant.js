const Tenant = require("../models/tenant");
const Maintenance = require("../models/maintenance");
const Invoice = require("../models/invoice");
const Lease = require("../models/lease");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /tenants
//get list of tenants
exports.getTenants = asyncHandler(async (req, res) => {
  try {
    // const tenantList = await Tenant.find().populate("user");
    // const tenantList = await User.find();
    const tenantList = await Tenant.find()
      .populate({
        path: "property",
      })
      .populate({
        path: "user",
      });

    if (tenantList) {
      res.status(200).json(tenantList);
    } else {
      res.status(404).json({ message: "tenants Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route GET /tenant/:id
//get tenant for id
exports.getTenantForId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const tenant = await Tenant.findById(id)
      .populate({
        path: "property",
      })
      .populate({
        path: "user",
      });
    const maintenanceList = await Maintenance.find({ tenant: id });
    const invoiceList = await Invoice.find({ tenant: id });
    const leaseList = await Lease.find({ tenant: id });
    tenant.set("maintenances", maintenanceList, { strict: false });
    tenant.set("invoices", invoiceList, { strict: false });
    tenant.set("leases", leaseList, { strict: false });
    if (tenant) {
      res.status(200).json(tenant);
    } else {
      res.status(404).json({ message: "tenants Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
