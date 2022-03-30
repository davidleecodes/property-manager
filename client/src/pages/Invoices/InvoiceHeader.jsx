import React from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";
import Paper from "@mui/material/Paper";

export default function Header({ currentInvoice }) {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid item container spacing={3}>
          {currentInvoice.property && (
            <PropertyItem property={currentInvoice.property} />
          )}

          {currentInvoice.tenant && (
            <TenantItem tenant={currentInvoice.tenant} />
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}
