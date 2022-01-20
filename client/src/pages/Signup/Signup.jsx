import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import UserFormReg from "../../components/forms/UserFormReg";

export default function Signup() {
  return (
    <Container component="main" maxWidth="xs">
      <Grid container direction="column" sx={{ mt: 2 }} spacing={2}>
        <UserFormReg label="owner" initValues={{ account_type: "owner" }} />
      </Grid>
    </Container>
  );
}
