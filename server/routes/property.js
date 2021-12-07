const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  getProperties,
  getPropertyForId,
  newProperty,
} = require("../controllers/property");

router.route("/").get(getProperties);
router.route("/:id").get(getPropertyForId);
router.route("/new").post(newProperty);

module.exports = router;
