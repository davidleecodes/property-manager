import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "./PropertyHeader";
import { getTenantsForProperty } from "../../helpers/APICalls/tenants";
import { getMaintenanceForProperty } from "../../helpers/APICalls/maintenances";
import { getInvoicesForProperty } from "../../helpers/APICalls/invoices";
import { getLeasesForProperty } from "../../helpers/APICalls/leases";
import { getPropertyForId } from "../../helpers/APICalls/properties";
import TabTableView from "../../components/TabTableView";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import moment from "moment";
import TenantAvatarCell from "../../components/TenantAvatarCell";
import currencyformatter from "../../helpers/currencyFormatter";

export default function PropertyView({ propertyId, currentProperty }) {
  const [tenantData, setTenantData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [leaseData, setleaseData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    // getTenantsForProperty(propertyId).then((res) => {
    //   setTenantData(res);
    // });
    // getMaintenanceForProperty(propertyId).then((res) => {
    //   setMaintenanceData(res);
    // });
    // getInvoicesForProperty(propertyId).then((res) => {
    //   setInvoiceData(res);
    // });
    // getLeasesForProperty(propertyId).then((res) => {
    //   setleaseData(res);
    // });
    getPropertyForId(propertyId).then((res) => {
      console.log(res);
      setPropertyData(res);
    });
  }, [propertyId]);

  const tenantColumns = [
    {
      label: "Name",
      content: (tenant) => (
        <TenantAvatarCell tenant={tenant} user={tenant.user} />
      ),
      hideLabel: true,
    },
    {
      label: "Unit",
      content: (tenant) => <span>{tenant.unit}</span>,
    },
    {
      label: "Phone",
      content: (tenant) => <span>{tenant.user.phone_number}</span>,
    },
    {
      label: "Email",
      content: (tenant) => <span>{tenant.user.email}</span>,
    },
    {
      label: "Overdue",
      content: (tenant) => <span>{tenant.isLate ? "late" : "paid"}</span>,
    },
  ];
  const unpaidTenantsData = tenantData.filter((tenant) => tenant.isLate);
  const tentantTabs = [
    {
      label: `${tenantData.length} tenants`,
      content: tenantData,
    },
    {
      label: `${unpaidTenantsData.length} unpaid`,
      content: unpaidTenantsData,
    },
  ];
  const tenantSortParams = [
    { label: "name", terms: [(item) => item.user.first_name] },
    { label: "unit", terms: [(item) => item.unit] },
  ];
  const maintenanceColumns = [
    {
      label: "Date",
      content: (maintenance) => <span>{maintenance.date}</span>,
    },
    {
      label: "Issue",
      content: (maintenance) => <span>{maintenance.issue}</span>,
    },
    {
      label: "Location",
      content: (maintenance) => (
        <span>
          {maintenance.location === "common"
            ? "common"
            : maintenance.tenant.unit}
        </span>
      ),
    },

    {
      label: "Name",
      content: (maintenance) => (
        <TenantAvatarCell tenant={maintenance.tenant} user={maintenance.user} />
      ),
      hideLabel: true,
    },

    {
      label: "Status",
      content: (maintenance) => <span>{maintenance.status}</span>,
    },

    {
      label: "",
      content: (maintenance) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/maintenances/${maintenance.id}`}
        >
          <span>view</span>
        </Link>
      ),
    },
  ];

  const unCompleteMaintanceData = maintenanceData.filter(
    (maintenance) => maintenance.status !== "close"
  );
  const maintenanceTabs = [
    {
      label: `${unCompleteMaintanceData.length} open`,
      content: unCompleteMaintanceData,
    },
    {
      label: `${maintenanceData.length} total`,
      content: maintenanceData,
    },
  ];

  const maintenanceSortParams = [
    { label: "date", terms: [(item) => item.date] },
    { label: "name", terms: [(item) => item.user.first_name] },
    { label: "unit", terms: [(item) => item.tenant.unit] },
  ];

  const invoiceColumns = [
    {
      label: "Due Date",
      content: (invoice) => <span>{invoice.due_date}</span>,
    },

    {
      label: "Name",
      content: (invoice) => (
        <TenantAvatarCell tenant={invoice.tenant} user={invoice.user} />
      ),
      hideLabel: true,
    },
    {
      label: "Amount",
      content: (invoice) => (
        <span>{currencyformatter.format(invoice.amount)}</span>
      ),
    },
    {
      label: "Paid Date",
      content: (invoice) => (
        <span>{`${invoice.paid_date} ${invoice.is_late ? "(late)" : ""}`}</span>
      ),
    },
    {
      label: "",
      content: (invoice) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/invoices/${invoice.id}`}
        >
          <span>view</span>
        </Link>
      ),
    },
  ];

  const currentInvoiceData = invoiceData.filter((invoice) => {
    let isAfter = moment(invoice.due_date).isAfter(moment([]));
    return !invoice.paid_date || isAfter;
  });
  const invoiceTabs = [
    {
      label: `${currentInvoiceData.length} current`,
      content: currentInvoiceData,
    },
    {
      label: `${invoiceData.length} total`,
      content: invoiceData,
    },
  ];

  const invoiceSortParams = [
    { label: "date", terms: [(item) => item.paid_date] },
    { label: "name", terms: [(item) => item.user.first_name] },
  ];

  const leaseColumns = [
    {
      label: "Name",
      content: (lease) => (
        <TenantAvatarCell tenant={lease.tenant} user={lease.user} />
      ),
      hideLabel: true,
    },
    {
      label: "monthy_rent",
      content: (lease) => (
        <span>{currencyformatter.format(lease.monthy_rent)}</span>
      ),
    },
    {
      label: "start_date",
      content: (lease) => <span>{lease.start_date}</span>,
    },
    {
      label: "end_date",
      content: (lease) => <span>{lease.end_date}</span>,
    },
    {
      label: "",
      content: (lease) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/leases/${lease.id}`}
        >
          <span>view</span>
        </Link>
      ),
    },
  ];

  const currentLeaseData = leaseData.filter((lease) => {
    return moment(lease.end_date).isAfter(moment([]));
  });
  const leaseTabs = [
    {
      label: `${currentLeaseData.length} current`,
      content: currentLeaseData,
    },
    {
      label: `${leaseData.length} total`,
      content: leaseData,
    },
  ];

  const leaseSortParams = [
    { label: "date", terms: [(item) => item.end_date] },
    { label: "name", terms: [(item) => item.user.first_name] },
  ];
  return (
    <Grid container spacing={3}>
      {/* <Header
        propertyId={propertyId}
        currentProperty={currentProperty}
        invoiceData={invoiceData}
      />
      <TabTableView
        label={"Tenants"}
        tabs={tentantTabs}
        columns={tenantColumns}
        sortParams={tenantSortParams}
      ></TabTableView>
      <TabTableView
        label={"Maintenances"}
        tabs={maintenanceTabs}
        columns={maintenanceColumns}
        sortParams={maintenanceSortParams}
      ></TabTableView>
      <TabTableView
        label={"Invoices"}
        tabs={invoiceTabs}
        columns={invoiceColumns}
        sortParams={invoiceSortParams}
      ></TabTableView>
      <TabTableView
        label={"Leases"}
        tabs={leaseTabs}
        columns={leaseColumns}
        sortParams={leaseSortParams}
      ></TabTableView> */}
    </Grid>
  );
}
