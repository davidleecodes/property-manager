const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tenant",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  amount: {
    type: Number,
  },
  sent_date: {
    type: Date,
  },
  due_date: {
    type: Date,
  },
  paid_date: {
    type: Date,
  },
  is_late: {
    type: Boolean,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    // required: true,
  },
});

module.exports = Invoice = mongoose.model("invoice", invoiceSchema, "invoice");
