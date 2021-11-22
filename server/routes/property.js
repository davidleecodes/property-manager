const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getProperties, getPropertyForId } = require("../controllers/property");

router.route("/").get(getProperties);
router.route("/:id").get(getPropertyForId);

module.exports = router;
