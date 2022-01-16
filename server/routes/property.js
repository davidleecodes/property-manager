const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { storageProperty, storage } = require("../utils/cloudinary");
const upload = multer({ storage: storageProperty });
const {
  getProperties,
  getPropertyForId,
  newProperty,
  editProperty,
  deleteProperty,
} = require("../controllers/property");

router.route("/").get(protect, getProperties);
router.route("/:id").get(protect, getPropertyForId);
router.route("/new").post(upload.single("file"), protect, newProperty);
router.route("/edit/:id").patch(upload.single("file"), protect, editProperty);
router.route("/delete/:id").delete(protect, deleteProperty);

module.exports = router;
