import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import UserFormReg from "../../components/forms/UserFormReg";
import { useAuth } from "../../context/useAuthContext";

export default function Profile() {
  const { loggedInUser } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <Grid container direction="column" sx={{ mt: 2 }} spacing={2}>
        <UserFormReg
          current={loggedInUser}
          label={loggedInUser.account_type}
          isHideDelete={true}
        />
      </Grid>
    </Container>
  );
}
