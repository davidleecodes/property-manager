const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
var multer = require("multer");
var upload = multer();
const {
  getLeases,
  getLeaseForId,
  newLease,
  editLease,
  deleteLease,
} = require("../controllers/lease");

router.route("/").get(protect, getLeases);
router.route("/:id").get(protect, getLeaseForId);
router.route("/new").post(protect, upload.array(), newLease);
router.route("/edit/:id").patch(protect, upload.array(), editLease);
router.route("/delete/:id").delete(protect, deleteLease);

module.exports = router;
