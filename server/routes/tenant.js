const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getTenants, getTenantForId } = require("../controllers/tenant");

router.route("/").get(getTenants);
router.route("/:id").get(getTenantForId);

module.exports = router;
