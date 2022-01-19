import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import UserFormOwner from "../../components/forms/UserFormOwner";

export default function Signup() {
  return (
    <Container component="main" maxWidth="xs">
      <Grid container direction="column" sx={{ mt: 2 }} spacing={2}>
        <UserFormOwner />
      </Grid>
    </Container>
  );
}
