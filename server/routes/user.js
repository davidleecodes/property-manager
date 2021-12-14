const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { storageUser } = require("../middleware/cloudinary");
const upload = multer({ storage: storageUser });

const { newUser } = require("../controllers/user");

router.route("/new").post(upload.single("file"), newUser);

module.exports = router;
