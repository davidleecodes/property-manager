const Tenant = require("../models/tenant");
const Maintenance = require("../models/maintenance");
const Invoice = require("../models/invoice");
const Lease = require("../models/lease");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");
const { removeImage } = require("../utils/cloudinary");

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

exports.editUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

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
    image_url,
    tenant_id,
  } = JSON.parse(req.body.data);

  const data = {
    first_name,
    last_name,
    phone_number,
    email,
    account_type,
    username,
    password,
  };

  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (req.file) {
    if (user.image_url) removeImage(user.image_url, "propertyManager/user");
    user.image_url = req.file.path;
    await user.save();
  } else if (user.image_url && !image_url) {
    removeImage(user.image_url, "propertyManager/user");
    user.image_url = null;
    await user.save();
  }

  let tenant;
  if (account_type === "tenant") {
    tenant = await Tenant.findByIdAndUpdate(
      tenant_id,
      { property, unit },
      { new: true }
    );
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
