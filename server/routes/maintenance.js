const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { storageMaintenance } = require("../middleware/cloudinary");
const upload = multer({ storage: storageMaintenance });
const {
  getMaintenances,
  getMaintenanceForId,
  newMaintenance,
} = require("../controllers/maintenance");

router.route("/").get(getMaintenances);
router.route("/:id").get(getMaintenanceForId);
router.route("/new").post(upload.array("files"), newMaintenance);
module.exports = router;
