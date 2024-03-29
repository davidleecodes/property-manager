import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";
import UserFormExt from "../../components/forms/UserFormExt";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

export default function Header({ currentTenant }) {
  const [editMode, setEditMode] = useState(false);
  function toggleEdit() {
    setEditMode(!editMode);
  }
  function tenantToUser(tenant) {
    const { user, ...rest } = tenant;
    user.tenant = rest;
    return user;
  }
  console.log(tenantToUser(currentTenant));
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        {!editMode && (
          <Grid item container spacing={3}>
            {currentTenant.user && <TenantItem tenant={currentTenant} />}
            <Grid item>
              {currentTenant.property && (
                <PropertyItem property={currentTenant.property} />
              )}
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid container justifyContent="flex-end">
                <Button variant="outlined" onClick={toggleEdit}>
                  edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        {editMode && (
          <UserFormExt
            current={tenantToUser(currentTenant)}
            handleCancel={toggleEdit}
          />
        )}
      </Paper>
    </Grid>
  );
}
