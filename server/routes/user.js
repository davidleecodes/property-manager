const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { storageUser } = require("../utils/cloudinary");
const upload = multer({ storage: storageUser });

const { editUser } = require("../controllers/user");

// router.route("/new").post(upload.single("file"), newUser);
router.route("/edit/:id").patch(upload.single("file"), editUser);

module.exports = router;
