const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { storageMaintenance } = require("../utils/cloudinary");
const upload = multer({ storage: storageMaintenance });
const {
  getMaintenances,
  getMaintenanceForId,
  newMaintenance,
  editMaintenance,
} = require("../controllers/maintenance");

router.route("/").get(getMaintenances);
router.route("/:id").get(getMaintenanceForId);
router.route("/new").post(upload.array("files"), newMaintenance);
router.route("/edit/:id").patch(upload.array("files"), editMaintenance);

module.exports = router;
