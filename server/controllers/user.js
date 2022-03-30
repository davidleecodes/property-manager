const User = require("../models/user");
const Maintenance = require("../models/maintenance");
const Invoice = require("../models/invoice");
const Lease = require("../models/lease");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /users
//get list of users
exports.getUsers = asyncHandler(async (req, res) => {
  const groupId = req.user.group;
  try {
    const userList = await User.find({ group: groupId });

    if (userList) {
      res.status(200).json(userList);
    } else {
      res.status(404).json({ message: "users Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route GET /user/:id
//get user for id
exports.getUserForId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    // .populate({
    //   path: "property",
    //   populate: { path: "units" },
    // })
    // .populate({
    //   path: "user",
    // })
    // .populate({
    //   path: "unit",
    // });
    // const maintenanceList = await Maintenance.find({ user: id });
    // const invoiceList = await Invoice.find({ user: id });
    // const leaseList = await Lease.find({ user: id });
    // user.set("maintenances", maintenanceList, { strict: false });
    // user.set("invoices", invoiceList, { strict: false });
    // user.set("leases", leaseList, { strict: false });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "users Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
