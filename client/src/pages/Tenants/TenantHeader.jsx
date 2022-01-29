import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";
import UserFormExt from "../../components/forms/UserFormExt";
import { Button } from "@mui/material";

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
    <React.Fragment>
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
    </React.Fragment>
  );
}
