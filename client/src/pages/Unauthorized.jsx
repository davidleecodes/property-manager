import React from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Unauthorized() {
  return (
    <Grid container component="main" alignItems="center" direction="column">
      <Box mt={5} />
      <Typography variant="h3" color="inherit" noWrap>
        Unauthorized
      </Typography>
      <Link
        component={RouterLink}
        to="/login"
        variant="button"
        underline="always"
        color="textPrimary"
      >
        Log In
      </Link>
    </Grid>
  );
}
