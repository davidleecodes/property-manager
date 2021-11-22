import React from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";

export default function Header({ tenantId, currentTenant }) {
  return (
    <React.Fragment>
      <Grid item container spacing={3}>
        {currentTenant.user && (
          <TenantItem tenant={currentTenant} user={currentTenant.user} />
        )}
        <Grid item>
          {currentTenant.property && (
            <PropertyItem property={currentTenant.property} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
