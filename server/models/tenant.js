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
  console.log("tenant", doc);
  if (doc) {
    //todo: check if user is also admin before delete

    const maintenances = await Maintenance.find({
      tenant: doc._id,
    });
    const invoices = await Invoice.find({
      tenant: doc._id,
    });
    const leases = await Lease.find({
      tenant: doc._id,
    });
    maintenances.forEach((maintenance) => {
      maintenance.remove();
    });
    invoices.forEach((invoice) => {
      invoice.remove();
    });
    leases.forEach((lease) => {
      lease.remove();
    });
    console.log("Maintenance delete result: ", maintenances.length);
    console.log("Invoice delete result: ", invoices.length);
    console.log("Lease delete result: ", leases.length);

    const unit = await Unit.findOne({ _id: doc.unit.toString() });

    unit.tenants = unit.tenants.filter((t) => {
      t.toString() !== doc._id;
    });
    unit.save();
  }
});

tenantSchema.post(["save"], async function (doc) {
  console.log("tenantSAVE", doc);
  if (doc) {
    //todo: check if user is also admin before delete

    const unit = await Unit.find({ _id: doc.unit });
    if (unit) {
      unit.tenants = [...unit.tenants, doc._id];
    }
    unit.save();
  }
});

tenantSchema.pre(["findOneAndUpdate"], async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  const update = this._update;
  console.log("tenantUpdate", doc);
  if (doc) {
    if (doc.unit.toString() === update.unit) {
      return next();
    }

    const oldUnit = await Unit.findOne({ _id: doc.unit.toString() });
    if (oldUnit) {
      oldUnit.tenants = oldUnit.tenants.filter((t) => {
        t.toString() !== doc._id;
      });
    }
    oldUnit.save();

    const newUnit = await Unit.findOne({ _id: update.unit });
    if (newUnit) {
      newUnit.tenants = [...newUnit.tenants, doc._id];
    }
    newUnit.save();
  }
});

module.exports = Tenant = mongoose.model("tenant", tenantSchema, "tenant");
