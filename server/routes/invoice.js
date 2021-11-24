const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { getInvoices, getInvoiceForId } = require("../controllers/invoice");

router.route("/").get(getInvoices);
router.route("/:id").get(getInvoiceForId);

module.exports = router;
