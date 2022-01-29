const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getTenants, getTenantForId } = require("../controllers/tenant");

router.route("/").get(protect, getTenants);
router.route("/:id").get(protect, getTenantForId);

module.exports = router;
