const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../utils/validate");
const multer = require("multer");
const { storageUser } = require("../utils/cloudinary");
const upload = multer({ storage: storageUser });
const protect = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  loadUser,
  logoutUser,
} = require("../controllers/auth");

// router
//   .route("/register")
//   .post(validateRegister, protect, upload.single("file"), registerUser);
router.route("/register").post(protect, upload.single("file"), registerUser);
router.route("/login").post(validateLogin, loginUser);
router.route("/user").get(protect, loadUser);
router.route("/logout").get(logoutUser);

module.exports = router;
