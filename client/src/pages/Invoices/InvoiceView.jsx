import React from "react";
import { Grid } from "@mui/material";
import InvoiceHeader from "./InvoiceHeader";
import Paper from "@mui/material/Paper";
import TableView from "../../components/TableView";
import Typography from "@mui/material/Typography";
import currencyformatter from "../../helpers/currencyFormatter";

export default function InvoiceView({ invoiceId, currentInvoice }) {
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
  ];
  return (
    <Grid container spacing={3}>
      <InvoiceHeader invoiceId={invoiceId} currentInvoice={currentInvoice} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mt: 2 }}>
          <Typography component="h2" variant="h6" color="primary">
            Invoice
          </Typography>
          <TableView
            data={[currentInvoice]}
            columns={invoiceColumns}
          ></TableView>
        </Paper>
      </Grid>
    </Grid>
  );
}
