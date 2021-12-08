import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "./PropertyHeader";
import { getPropertyForId } from "../../helpers/APICalls/property";
import TabTableView from "../../components/TabTableView";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import moment from "moment";
import TenantAvatarCell from "../../components/TenantAvatarCell";
import currencyformatter from "../../helpers/currencyFormatter";
import LoadingView from "../../components/LoadingView";
import dateFormatter from "./../../helpers/dateFormatter";

export default function PropertyView({ propertyId }) {
  const [tenantMap, setTenantMap] = useState();
  const [tenantData, setTenantData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [leaseData, setleaseData] = useState([]);
  const [propertyData, setPropertyData] = useState();

  useEffect(() => {
    if (propertyId) {
      getPropertyForId(propertyId).then((res) => {
        setPropertyData(res);
        if (!res.message) {
          let tenants = {};
          res.tenants.forEach((t) => {
            tenants[t._id] = t;
          });
          setTenantMap(tenants);
          setTenantData(res.tenants);
          setMaintenanceData(res.maintenances);
          setInvoiceData(res.invoices);
          setleaseData(res.leases);
        }
      });
    }
  }, [propertyId]);

  const tenantColumns = [
    {
      label: "Name",
      content: (tenant) => <TenantAvatarCell tenant={tenant} />,
      hideLabel: true,
    },
    {
      label: "Unit",
      content: (tenant) => <span>{tenant.unit.name}</span>,
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
    { label: "unit", terms: [(item) => item.unit.name] },
  ];
  const maintenanceColumns = [
    {
      label: "Date",
      content: (maintenance) => <span>{dateFormatter(maintenance.date)}</span>,
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
            : tenantMap[maintenance.tenant] &&
              tenantMap[maintenance.tenant].unit.name}
        </span>
      ),
    },

    {
      label: "Name",
      content: (maintenance) => (
        <TenantAvatarCell tenant={tenantMap[maintenance.tenant]} />
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
          to={`/maintenances/${maintenance._id}`}
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
    { label: "date", terms: [(item) => dateFormatter(item.date)] },
    {
      label: "name",
      terms: [(item) => tenantMap[item.tenant].user.first_name],
    },
    { label: "unit", terms: [(item) => tenantMap[item.tenant].unit.name] },
  ];

  const invoiceColumns = [
    {
      label: "Due Date",
      content: (invoice) => <span>{dateFormatter(invoice.due_date)}</span>,
    },

    {
      label: "Name",
      content: (invoice) => (
        <TenantAvatarCell tenant={tenantMap[invoice.tenant]} />
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
        <span>{`${dateFormatter(invoice.paid_date)} ${
          invoice.is_late ? "(late)" : ""
        }`}</span>
      ),
    },
    {
      label: "",
      content: (invoice) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/invoices/${invoice._id}`}
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
    { label: "date", terms: [(item) => dateFormatter(item.paid_date)] },
    {
      label: "name",
      terms: [(item) => tenantMap[item.tenant].user.first_name],
    },
  ];

  const leaseColumns = [
    {
      label: "Name",
      content: (lease) => <TenantAvatarCell tenant={tenantMap[lease.tenant]} />,
      hideLabel: true,
    },
    {
      label: "monthly_rent",
      content: (lease) => (
        <span>{currencyformatter.format(lease.monthly_rent)}</span>
      ),
    },
    {
      label: "start_date",
      content: (lease) => <span>{dateFormatter(lease.start_date)}</span>,
    },
    {
      label: "end_date",
      content: (lease) => <span>{dateFormatter(lease.end_date)}</span>,
    },
    {
      label: "",
      content: (lease) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/leases/${lease._id}`}
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
    { label: "date", terms: [(item) => dateFormatter(item.end_date)] },
    {
      label: "name",
      terms: [(item) => tenantMap[item.tenant].user.first_name],
    },
  ];
  return (
    <LoadingView
      data={propertyData}
      loadingState={(data) => !data}
      notFoundState={(data) => data.message}
    >
      {propertyData && (
        <Grid container spacing={3}>
          <Header currentProperty={propertyData} invoiceData={invoiceData} />
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
          ></TabTableView>
        </Grid>
      )}
    </LoadingView>
  );
}
