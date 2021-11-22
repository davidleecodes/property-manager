import React from "react";
import { Grid } from "@mui/material";
import LeaseHeader from "./LeaseHeader";
import Paper from "@mui/material/Paper";
import TableView from "../../components/TableView";
import Typography from "@mui/material/Typography";
import currencyformatter from "../../helpers/currencyFormatter";

export default function LeaseView({ leaseId, currentLease }) {
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
      label: "end date",
      content: (lease) => <span>{lease.end_date}</span>,
    },
  ];
  return (
    <Grid container spacing={3}>
      <LeaseHeader leaseId={leaseId} currentLease={currentLease} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mt: 2 }}>
          <Typography component="h2" variant="h6" color="primary">
            Lease
          </Typography>
          <TableView data={[currentLease]} columns={leaseColumns}></TableView>
        </Paper>
      </Grid>
    </Grid>
  );
}
