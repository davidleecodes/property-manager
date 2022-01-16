import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";
import UserForm from "../../components/forms/UserForm";
import { Button } from "@mui/material";

export default function Header({ currentTenant }) {
  const [editMode, setEditMode] = useState(false);
  function toggleEdit() {
    setEditMode(!editMode);
  }

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
        <UserForm current={currentTenant} handleCancel={toggleEdit} />
      )}
    </React.Fragment>
  );
}
