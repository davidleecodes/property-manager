import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

export default function RedirectLoggedInRoute({ Comp, ...rest }) {
  const { loggedInUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInUser === undefined) {
          return (
            <Grid container justify="center" alignItems="center">
              <Box mt={20}></Box>
              <CircularProgress></CircularProgress>
            </Grid>
          );
        } else {
          return <Comp {...rest} {...props} />;
        }
      }}
    />
  );
}
