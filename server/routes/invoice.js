const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
var multer = require("multer");
var upload = multer();
const {
  getInvoices,
  getInvoiceForId,
  newInvoice,
  editInvoice,
  deleteInvoice,
} = require("../controllers/invoice");

router.route("/").get(protect, getInvoices);
router.route("/:id").get(protect, getInvoiceForId);
router.route("/new").post(protect, upload.array(), newInvoice);
router.route("/edit/:id").patch(protect, upload.array(), editInvoice);
router.route("/delete/:id").delete(protect, deleteInvoice);
module.exports = router;
