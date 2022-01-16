import React from "react";
import Link from "@mui/material/Link";
import { NavLink as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../context/useAuthContext";
import acct from "../helpers/accoutTypes";
const linkStyle = {
  my: 1,
  mx: 1.5,
  "&.selected": {
    color: "red",
  },
};
export default function Nav() {
  const { loggedInUser, logout } = useAuth();

  let linkPaths;

  if (loggedInUser && loggedInUser.account_type === acct.owner) {
    linkPaths = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Properties", path: "/properties" },
      { label: "Tenants", path: "/tenants" },
      { label: "Maintenances", path: "/maintenances" },
      { label: "Invoices", path: "/invoices" },
      { label: "Leases", path: "/leases" },
    ];
  } else {
    linkPaths = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Tenants", path: "/tenants" },
      { label: "Maintenances", path: "/maintenances" },
      { label: "Invoices", path: "/invoices" },
      { label: "Leases", path: "/leases" },
    ];
  }
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Company name
        </Typography>

        <nav>
          {linkPaths.map((lp) => (
            <Link
              key={lp.label}
              component={RouterLink}
              variant="button"
              color="textPrimary"
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
            <Link component={RouterLink} to="/profile" underline="none">
              {`${loggedInUser.first_name} ${loggedInUser.last_name}`}
            </Link>
            <Button
              onClick={() => logout()}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
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
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
