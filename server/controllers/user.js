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
// exports.newUser = asyncHandler(async (req, res) => {
//   const {
//     first_name,
//     last_name,
//     phone_number,
//     email,
//     account_type,
//     password,
//     property,
//     unit,
//   } = JSON.parse(req.body.data);

//   const user = await User.create({
//     first_name,
//     last_name,
//     phone_number,
//     email,
//     account_type,
//     password,
//   });

//   if (req.file) {
//     user.image_url = req.file.path;
//     await user.save();
//   }
//   let tenant;
//   if (account_type === "tenant") {
//     tenant = await Tenant.create({ user: user._id, property, unit });
//     tenant.populate("user");
//   }
//   let group;
//   if (account_type === "owner") {
//     group = await Group.create();
//     user.group = group._id;
//     await user.save();
//   }
//   if (tenant) {
//     res.status(201).json({
//       success: { tenant, user },
//     });
//   } else if (user) {
//     res.status(201).json({
//       success: { user },
//     });
//   } else {
//     res.status(404);
//     throw new Error("Invalid request data");
//   }
// });

exports.editUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const {
    first_name,
    last_name,
    phone_number,
    email,
    account_type,
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
    password,
  };

  // const user = await User.findByIdAndUpdate(id, data, { new: true });
  const user = await User.findById(id);
  user.first_name = first_name || user.first_name;
  user.last_name = last_name || user.last_name;
  user.phone_number = phone_number || user.phone_number;
  user.email = email || user.email;

  user.account_type = account_type || user.account_type;
  user.password = password || user.password;
  user.property = property || user.property;
  user.unit = unit || user.unit;
  user.image_url = image_url || user.image_url;
  user.tenant_id = tenant_id || user.tenant_id;
  // await user.save();

  console.log(password);
  if (req.file) {
    if (user.image_url) removeImage(user.image_url, "propertyManager/user");
    user.image_url = req.file.path;
  } else if (user.image_url && !image_url) {
    removeImage(user.image_url, "propertyManager/user");
    user.image_url = null;
  }

  await user.save();

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
