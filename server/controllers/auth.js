const User = require("../models/user");
const Group = require("../models/group");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
// const Profile = require("../models/Profile");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  console.log("reg", req.body);

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
  console.log(first_name);

  const emailExists = await User.findOne({ email });

  // if (emailExists) {
  //   res.status(400);
  //   throw new Error("A user with that email already exists");
  // }
  let group;
  if (account_type === "owner") {
    group = await Group.create({});
    console.log("GROUPCREATE", group);
  }
  let groupId = group ? group._id : req.user.group;
  console.log("GROUPID", groupId);

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
  console.log("ADD");

  // if (req.file) {
  //   user.image_url = req.file.path;
  //   await user.save();
  // }
  // console.log("File", req.file);

  if (user) {
    console.log("TEST");
    let tenant;
    if (account_type === "tenant") {
      tenant = await Tenant.create({
        user: user._id,
        property,
        unit,
        group: groupId,
      });
      console.log(tenant);
      tenant.populate("user");
    }
    if (account_type === "owner") {
      const token = generateToken(user._id, groupId, user.account_type);
      const secondsInWeek = 604800;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: secondsInWeek * 1000,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      });
    }

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
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  console.log(user.account_type);
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id, user.group, user.account_type);
    const secondsInWeek = 604800;

    console.log("tokenIN", token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });

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
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  const user = await User.findById(req.user._id);

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
