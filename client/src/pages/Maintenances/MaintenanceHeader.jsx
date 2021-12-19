import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";
import MaintenanceForm from "../../components/forms/MaintenanceForm";
import { Button } from "@mui/material";

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
