const Tenant = require("../models/tenant");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /tenants
//get list of tenants
exports.getTenants = asyncHandler(async (req, res) => {
  console.log("req");
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

    console.log(tenantList);
    if (tenantList) {
      res.status(200).json({ tenants: tenantList });
    } else {
      res.status(404).json({ message: "tenants Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
