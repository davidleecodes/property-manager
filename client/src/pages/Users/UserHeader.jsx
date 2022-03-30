import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "../../components/PropertyItem";
import TenantItem from "../../components/TenantItem";
import UserFormExt from "../../components/forms/UserFormExt";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

export default function Header({ currentUser }) {
  const [editMode, setEditMode] = useState(false);
  function toggleEdit() {
    setEditMode(!editMode);
  }
  // function userToUser(user) {
  //   const { user, ...rest } = user;
  //   user.user = rest;
  //   return user;
  // }
  // console.log(userToUser(currentUser));
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        {!editMode && (
          <Grid item container spacing={3}>
            {currentUser.user && <TenantItem user={currentUser} />}
            <Grid item>
              {currentUser.property && (
                <PropertyItem property={currentUser.property} />
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
          <UserFormExt current={currentUser} handleCancel={toggleEdit} />
        )}
      </Paper>
    </Grid>
  );
}
