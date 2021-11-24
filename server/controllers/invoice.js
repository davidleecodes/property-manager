const Invoice = require("../models/invoice");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /invoices
//get list of invoices
exports.getInvoices = asyncHandler(async (req, res) => {
  try {
    const InvoiceList = await Invoice.find()
      .populate({
        path: "tenant",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "property",
      });
    if (InvoiceList) {
      res.status(200).json(InvoiceList);
    } else {
      res.status(404).json({ message: "Invoices Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route GET /invoice/:id
//get invoice for id
exports.getInvoiceForId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const invoice = await Invoice.findById(id)
      .populate({
        path: "tenant",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "property",
      });

    if (invoice) {
      res.status(200).json(invoice);
    } else {
      res.status(404).json({ message: "invoice Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
