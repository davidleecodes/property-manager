const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  getTenants,
  getTenantForId,
  deleteTenant,
} = require("../controllers/tenant");

router.route("/").get(protect, getTenants);
router.route("/:id").get(protect, getTenantForId);
router.route("/delete/:id").delete(protect, deleteTenant);

module.exports = router;
