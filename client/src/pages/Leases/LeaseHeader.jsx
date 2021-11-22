import React from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";

export default function Header({ leaseId, currentLease }) {
  return (
    <React.Fragment>
      <Grid item container spacing={3}>
        {currentLease.property && (
          <PropertyItem property={currentLease.property} />
        )}

        {currentLease.tenant && (
          <TenantItem tenant={currentLease.tenant} user={currentLease.user} />
        )}
      </Grid>
    </React.Fragment>
  );
}
