const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  getMaintenances,
  getMaintenanceForId,
} = require("../controllers/maintenance");

router.route("/").get(getMaintenances);
router.route("/:id").get(getMaintenanceForId);

module.exports = router;
