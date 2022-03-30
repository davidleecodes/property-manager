const User = require("../models/user");
const Group = require("../models/group");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
// const Profile = require("../models/Profile");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    account_type,
    password,
    property,
    unit,
  } = JSON.parse(req.body.data);

  const emailExists = await User.findOne({ email });

  // if (emailExists) {
  //   res.status(400);
  //   throw new Error("A user with that email already exists");
  // }
  let group;
  if (account_type === "owner") {
    group = await Group.create({});
  }
  let groupId = group ? group._id : req.user.group;

  const user = await User.create({
    first_name,
    last_name,
    phone_number,
    email,
    account_type,
    password,
    image_url: req.file ? req.file.path : null,
    group: groupId,
  });

  if (user) {
    let tenant;
    if (account_type === "tenant") {
      tenant = await Tenant.create({
        user: user._id,
        property,
        unit,
        group: groupId,
      });
      tenant.populate("user");
    }
    if (account_type === "owner") {
      const token = generateToken(user._id, groupId, user.admin_type, "staff");
      const secondsInWeek = 604800;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: secondsInWeek * 1000,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      });
    }
    user.set("login_type", loginType, { strict: false });

    if (tenant) {
      user.set("tenant", tenant, { strict: false });
    }
    const { password, ...userData } = user.toJSON();

    res.status(201).json({
      success: {
        user: {
          ...userData,
        },
        tenant,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password, loginType } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(
      user._id,
      user.group,
      user.admin_type,
      loginType
    );
    console.log(loginType, token);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });
    user.set("login_type", loginType, { strict: false });
    // if (user.account_type === "tenant") {
    if (loginType === "tenant" && user.is_Tenant) {
      const tenant = await Tenant.findOne({ user: user._id }).populate({
        path: "unit",
      });
      user.set("tenant", tenant, { strict: false });
    }
    const { password, ...userData } = user.toJSON();
    res.status(200).json({
      success: {
        user: {
          ...userData,
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(req);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (user.account_type === "tenant") {
    const tenant = await Tenant.findOne({ user: user._id }).populate({
      path: "unit",
    });
    user.set("tenant", tenant, { strict: false });
  }
  const { password, ...userData } = user.toJSON();

  res.status(200).json({
    success: {
      user: {
        ...userData,
      },
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  res.send("You have successfully logged out");
});

// @route GET /auth/edit/:id
// @desc Logout user
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
  user.property = property || user.property;
  user.image_url = image_url || user.image_url;
  user.password = password || user.password;
  // if (first_name) user.first_name = first_name;
  // if (last_name) user.last_name = last_name;
  // if (phone_number) user.phone_number = phone_number;
  // if (email) user.email = email;
  // if (account_type) user.account_type = account_type;
  // if (property) user.property = property;
  // if (image_url) user.image_url = image_url;
  // if (password) {
  //   console.log("PASS");
  //   user.password = password;
  // }
  // user.tenant_id = tenant_id || user.tenant_id;
  // user.unit = unit || user.unit;

  // await user.save();

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

//@route Delete /auth/delete/:id
//delete property
exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const groupId = req.user.group;
  let user;

  if (userId) {
    user = await User.findOneAndDelete({
      _id: userId,
      group: groupId,
    });
  }
  if (!user) {
    res.status(404);
    throw new Error("Invalid requests");
  }

  res.status(200).json({
    success: { user },
  });
});
