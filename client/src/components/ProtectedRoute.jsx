import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

export default function ProtectedRoute({ Comp, allow, ...rest }) {
  const { loggedInUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInUser === undefined) {
          return (
            <Grid container>
              <Box mt={20}></Box>
              <CircularProgress></CircularProgress>
            </Grid>
          );
        } else {
          if (
            (loggedInUser && !allow) ||
            (loggedInUser && allow && allow.includes(loggedInUser.account_type))
          ) {
            return <Comp {...rest} {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/unauthorized",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }
      }}
    />
  );
}
