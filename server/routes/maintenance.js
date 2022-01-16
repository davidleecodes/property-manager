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
  deleteMaintenance,
} = require("../controllers/maintenance");

router.route("/").get(protect, getMaintenances);
router.route("/:id").get(protect, getMaintenanceForId);
router.route("/new").post(protect, upload.array("files"), newMaintenance);
router
  .route("/edit/:id")
  .patch(protect, upload.array("files"), editMaintenance);
router.route("/delete/:id").delete(protect, deleteMaintenance);

module.exports = router;
