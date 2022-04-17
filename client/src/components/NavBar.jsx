import React from "react";
import Link from "@mui/material/Link";
import { NavLink as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../context/useAuthContext";
import acct from "../helpers/accountTypes";
import { theme } from "./../themes/theme";
import CssBaseline from "@mui/material/CssBaseline";
import loginType from "./../helpers/loginTypes";

const linkStyle = {
  my: 1,
  mx: 1.5,
  "&.selected": {
    color: theme.palette.secondary.main,
  },
};
export default function Nav() {
  const { loggedInUser, logout } = useAuth();
  console.log(loggedInUser);
  let linkPaths;

  if (loggedInUser && loggedInUser.loggedin_acct === acct.tenant) {
    linkPaths = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Maintenances", path: "/maintenances" },
      { label: "Invoices", path: "/invoices" },
      { label: "Leases", path: "/leases" },
    ];
  } else if (loggedInUser && loggedInUser.loggedin_acct === acct.owner) {
    linkPaths = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Properties", path: "/properties" },
      { label: "Tenants", path: "/tenants" },
      { label: "Maintenances", path: "/maintenances" },
      { label: "Invoices", path: "/invoices" },
      { label: "Leases", path: "/leases" },
      { label: "Users", path: "/users" },
    ];
  } else if (loggedInUser && loggedInUser.loggedin_acct === acct.super) {
    linkPaths = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Properties", path: "/properties" },
      { label: "Tenants", path: "/tenants" },
      { label: "Maintenances", path: "/maintenances" },
    ];
  } else {
    linkPaths = [{ label: "Dashboard", path: "/dashboard" }];
  }
  return (
    <>
      <CssBaseline />

      <AppBar
        position="static"
        // color="primary"
        elevation={0}
        enableColorOnDark
        // sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h4"
            // color="secondary"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            tuk•den
          </Typography>

          <nav>
            {linkPaths.map((lp) => (
              <Link
                key={lp.label}
                component={RouterLink}
                variant="button"
                // color="textPrimary"
                color={theme.palette.primary.contrastText}
                to={lp.path}
                activeClassName="selected"
                sx={linkStyle}
              >
                {lp.label}
              </Link>
            ))}
          </nav>
          {loggedInUser && (
            <>
              <Link
                component={RouterLink}
                to="/profile"
                underline="none"
                color={theme.palette.primary.contrastText}
              >
                {`${loggedInUser.first_name} ${loggedInUser.last_name}`}
              </Link>
              <Button
                onClick={() => logout()}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
                color="secondary"
              >
                Logout
              </Button>
            </>
          )}
          {!loggedInUser && (
            <Button
              component={RouterLink}
              to={"/login"}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              color="secondary"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
