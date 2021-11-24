const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getLeases, getLeaseForId } = require("../controllers/lease");

router.route("/").get(getLeases);
router.route("/:id").get(getLeaseForId);

module.exports = router;
