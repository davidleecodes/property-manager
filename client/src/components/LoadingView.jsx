import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material/";

export default function LoadingView({
  data,
  loadingState,
  notFoundState,
  children,
}) {
  if (loadingState(data)) {
    return (
      <Grid
        container
        column
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  } else if (notFoundState(data)) {
    return (
      <Typography component="h2" variant="h6" color="primary" align="center">
        Not Found
      </Typography>
    );
  } else {
    return children;
  }
}
