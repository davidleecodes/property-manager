import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TenantHeader from "./TenantHeader";
import { getTenantForId } from "../../helpers/APICalls/tenant";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import currencyformatter from "../../helpers/currencyFormatter";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "./../../helpers/dateFormatter";
import UserForm from "../../components/forms/UserForm";

export default function TenantView({ tenantId }) {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [leaseData, setLeaseData] = useState([]);
  const [tenantData, setTenantData] = useState();

  useEffect(() => {
    if (tenantId) {
      getTenantForId(tenantId).then((res) => {
        setTenantData(res);
        setMaintenanceData(res.maintenances);
        setInvoiceData(res.invoices);
        setLeaseData(res.leases);
      });
    }
  }, [tenantId]);

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
          {maintenance.location === "common" ? "common" : tenantData.unit.name}
        </span>
      ),
    },
    {
      label: "Status",
      content: (tenant) => <span>{tenant.status}</span>,
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

  const invoiceColumns = [
    {
      label: "amount",
      content: (invoice) => (
        <span>{currencyformatter.format(invoice.amount)}</span>
      ),
    },
    {
      label: "due date",
      content: (invoice) => <span>{dateFormatter(invoice.due_date)}</span>,
    },
    {
      label: "paid date ",
      content: (invoice) => <span>{dateFormatter(invoice.paid_date)}</span>,
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

  const leaseColumns = [
    {
      label: "monthly rent",
      content: (lease) => (
        <span>{currencyformatter.format(lease.monthly_rent)}</span>
      ),
    },
    {
      label: "start date",
      content: (lease) => <span>{dateFormatter(lease.start_date)}</span>,
    },
    {
      label: "end date ",
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

  return (
    <LoadingView
      data={tenantData}
      loadingState={(data) => !data}
      notFoundState={(data) => data.message}
    >
      {tenantData && (
        <Grid container spacing={3}>
          <TenantHeader currentTenant={tenantData} />
          <UserForm current={tenantData} />
          <Grid item xs={12}>
            <SingleTableView
              label={"Maintenance"}
              data={maintenanceData}
              columns={maintenanceColumns}
            />
            <SingleTableView
              label={"Invoices"}
              data={invoiceData}
              columns={invoiceColumns}
            />

            <SingleTableView
              label={"Leases"}
              data={leaseData}
              columns={leaseColumns}
            />
          </Grid>
        </Grid>
      )}
    </LoadingView>
  );
}
