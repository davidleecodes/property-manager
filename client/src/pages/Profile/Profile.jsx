import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import UserFormReg from "../../components/forms/UserFormReg";
import { useAuth } from "../../context/useAuthContext";
import CssBaseline from "@mui/material/CssBaseline";

export default function Profile() {
  const { loggedInUser } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Grid container direction="column" sx={{ mt: 2 }} spacing={2}>
        <UserFormReg
          current={loggedInUser}
          label={loggedInUser.loggedin_acct}
          isHideDelete={true}
        />
      </Grid>
    </Container>
  );
}
