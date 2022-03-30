import React from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import Paper from "@mui/material/Paper";
import TenantItem from "../../components/TenantItem";

export default function Header({ currentMaintenance }) {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid item container spacing={3}>
          {currentMaintenance.property && (
            <PropertyItem property={currentMaintenance.property} />
          )}

          {currentMaintenance.tenant && (
            <TenantItem tenant={currentMaintenance.tenant} />
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}
