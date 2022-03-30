const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getUsers, getUserForId } = require("../controllers/user");

router.route("/").get(protect, getUsers);
router.route("/:id").get(protect, getUserForId);

module.exports = router;
