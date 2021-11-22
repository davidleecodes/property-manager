const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getTenants } = require("../controllers/tenant");

router.route("/").get(getTenants);

module.exports = router;
