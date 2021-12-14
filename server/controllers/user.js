const Tenant = require("../models/tenant");
const Maintenance = require("../models/maintenance");
const Invoice = require("../models/invoice");
const Lease = require("../models/lease");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route Post /user/new
//post new User and account type
exports.newUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    account_type,
    username,
    password,
    property,
    unit,
  } = JSON.parse(req.body.data);

  const user = await User.create({
    first_name,
    last_name,
    phone_number,
    email,
    account_type,
    username,
    password,
  });

  if (req.file) {
    user.image_url = req.file.path;
    await user.save();
  }
  console.log(account_type);
  let tenant;
  if (account_type === "tenant") {
    tenant = await Tenant.create({ user: user._id, property, unit });
    tenant.populate("user");
  }

  if (tenant) {
    res.status(201).json({
      success: { tenant, user },
    });
  } else if (user) {
    res.status(201).json({
      success: { user },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});
