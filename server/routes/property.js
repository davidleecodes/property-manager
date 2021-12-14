const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { storageProperty, storage } = require("../middleware/cloudinary");
const upload = multer({ storage: storageProperty });
const {
  getProperties,
  getPropertyForId,
  newProperty,
  editProperty,
} = require("../controllers/property");
const file = require("../middleware/file");

router.route("/").get(getProperties);
router.route("/:id").get(getPropertyForId);
router.route("/new").post(upload.single("file"), newProperty);
router.route("/edit/:id").patch(upload.single("file"), editProperty);

module.exports = router;
