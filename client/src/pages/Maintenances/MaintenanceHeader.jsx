import React from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";

export default function Header({ currentMaintenance }) {
  return (
    <React.Fragment>
      <Grid item container spacing={3}>
        {currentMaintenance.property && (
          <PropertyItem property={currentMaintenance.property} />
        )}

        {currentMaintenance.tenant && (
          <TenantItem tenant={currentMaintenance.tenant} />
        )}
      </Grid>
    </React.Fragment>
  );
}
