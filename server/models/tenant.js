const mongoose = require("mongoose");
const User = require("./user");
const Maintenance = require("./maintenance");
const Invoice = require("./invoice");
const Lease = require("./lease");

const tenantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
  tenant_since: {
    type: Date,
    default: Date.now,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    // required: true,
  },
});

tenantSchema.post(["findOneAndDelete", "remove"], async function (doc) {
  if (doc) {
    //todo: check if user is also admin before delete
    const user = await User.find({
      _id: doc.user,
    });
    const maintenances = await Maintenance.find({
      tenant: doc._id,
    });
    const invoices = await Invoice.find({
      tenant: doc._id,
    });
    const leases = await Lease.find({
      tenant: doc._id,
    });
    user.remove();
    maintenances.forEach((maintenance) => {
      maintenance.remove();
    });
    invoices.forEach((invoice) => {
      invoice.remove();
    });
    leases.forEach((lease) => {
      lease.remove();
    });
    console.log("User delete result: ", user.length);
    console.log("Maintenance delete result: ", maintenance.length);
    console.log("Invoice delete result: ", invoice.length);
    console.log("Lease delete result: ", lease.length);
  }
});

module.exports = Tenant = mongoose.model("tenant", tenantSchema, "tenant");
