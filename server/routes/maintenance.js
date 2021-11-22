const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getMaintenances } = require("../controllers/maintenance");

router.route("/").get(getMaintenances);

module.exports = router;
