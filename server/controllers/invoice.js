const Invoice = require("../models/invoice");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /invoices
//get list of invoices
exports.getInvoices = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const groupId = req.user.group;
  const loggedin_acct = req.user.loggedin_acct;

  console.log(userId, groupId, loggedin_acct);
  try {
    let query = {
      group: groupId,
    };
    if (loggedin_acct === "tenant") {
      const tenant = await Tenant.findOne({ user: userId });
      query.tenant = tenant._id;
    }
    console.log(query);

    const InvoiceList = await Invoice.find(query)
      .populate({
        path: "tenant",
        populate: [{ path: "user" }, { path: "unit" }],
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
  const userId = req.user._id;
  const groupId = req.user.group;
  const loggedin_acct = req.user.loggedin_acct;

  try {
    let query = {
      _id: id,
      group: groupId,
    };
    if (loggedin_acct === "tenant") {
      const tenant = await Tenant.findOne({ user: userId });
      query.tenant = tenant._id;
    }
    const invoice = await Invoice.findOne(query)
      .populate({
        path: "tenant",
        populate: [{ path: "user" }, { path: "unit" }],
      })
      .populate({
        path: "property",
        populate: { path: "units" },
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

exports.newInvoice = asyncHandler(async (req, res) => {
  const groupId = req.user.group;
  console.log("body", req.body.data);

  const { tenant, property, amount, sent_date, due_date, paid_date, is_late } =
    JSON.parse(req.body.data);

  const invoice = await Invoice.create({
    tenant,
    property,
    amount,
    sent_date,
    due_date,
    paid_date,
    // is_late,
    group: groupId,
  });

  if (invoice) {
    res.status(201).json({
      success: { invoice },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});

//@route Patch /invoice/edit/:id
//patch invoice
exports.editInvoice = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("body", req.body.data);

  const { amount, sent_date, due_date, paid_date, is_late } = JSON.parse(
    req.body.data
  );
  const data = {
    amount,
    sent_date,
    due_date,
    paid_date,
    is_late,
  };
  console.log(data);

  const invoice = await Invoice.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (invoice) {
    res.status(201).json({
      success: { invoice },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});

//@route Delete /invoice/delete/:id
//delete invoice
exports.deleteInvoice = asyncHandler(async (req, res) => {
  console.log("DELETE");
  const invoiceId = req.params.id;
  const groupId = req.user.group;
  let invoice;

  if (invoiceId) {
    invoice = await Invoice.findOneAndDelete({
      _id: invoiceId,
      group: groupId,
    });
  }
  if (!invoice) {
    res.status(404);
    throw new Error("Invalid requests");
  }

  res.status(200).json({
    success: { invoice },
  });
});
