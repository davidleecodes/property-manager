import React from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";

export default function Header({ currentInvoice }) {
  return (
    <React.Fragment>
      <Grid item container spacing={3}>
        {currentInvoice.property && (
          <PropertyItem property={currentInvoice.property} />
        )}

        {currentInvoice.tenant && <TenantItem tenant={currentInvoice.tenant} />}
      </Grid>
    </React.Fragment>
  );
}
