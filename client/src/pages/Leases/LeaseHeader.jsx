import React from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";
import Paper from "@mui/material/Paper";

export default function Header({ currentLease }) {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid item container spacing={3}>
          {currentLease.property && (
            <PropertyItem property={currentLease.property} />
          )}

          {currentLease.tenant && <TenantItem tenant={currentLease.tenant} />}
        </Grid>
      </Paper>
    </Grid>
  );
}
