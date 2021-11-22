import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TenantHeader from "./TenantHeader";
import { getMaintenanceForTenant } from "../../helpers/APICalls/maintenances";
import { getInvoicesForTenant } from "../../helpers/APICalls/invoices";
import { getLeasesForTenant } from "../../helpers/APICalls/leases";
import TableView from "../../components/TableView";
import Paper from "@mui/material/Paper";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import currencyformatter from "../../helpers/currencyFormatter";

export default function TenantView({ tenantId, currentTenant }) {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [leaseData, setLeaseData] = useState([]);

  useEffect(() => {
    getMaintenanceForTenant(tenantId).then((res) => {
      setMaintenanceData(res);
    });
    getInvoicesForTenant(tenantId).then((res) => {
      setInvoiceData(res);
    });
    getLeasesForTenant(tenantId).then((res) => {
      setLeaseData(res);
    });
  }, [tenantId]);

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
          {maintenance.location === "common" ? "common" : currentTenant.unit}
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
          to={`/maintenances/${maintenance.id}`}
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
      content: (invoice) => <span>{invoice.due_date}</span>,
    },
    {
      label: "paid date ",
      content: (invoice) => <span>{invoice.paid_date}</span>,
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

  const leaseColumns = [
    {
      label: "monthy rent",
      content: (lease) => (
        <span>{currencyformatter.format(lease.monthy_rent)}</span>
      ),
    },
    {
      label: "start date",
      content: (lease) => <span>{lease.start_date}</span>,
    },
    {
      label: "end date ",
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

  return (
    <Grid container spacing={3}>
      <TenantHeader tenantId={tenantId} currentTenant={currentTenant} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography component="h2" variant="h6" color="primary">
            Maintances
          </Typography>
          <TableView
            data={maintenanceData}
            columns={maintenanceColumns}
          ></TableView>
        </Paper>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mt: 2 }}>
          <Typography component="h2" variant="h6" color="primary">
            Invoices
          </Typography>
          <TableView data={invoiceData} columns={invoiceColumns}></TableView>
        </Paper>

        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mt: 2 }}>
          <Typography component="h2" variant="h6" color="primary">
            Leases
          </Typography>
          <TableView data={leaseData} columns={leaseColumns}></TableView>
        </Paper>
      </Grid>
    </Grid>
  );
}
