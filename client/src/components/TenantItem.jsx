import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { DefaultUserImage } from "../images/images";

export default function TenantItem({ tenant }) {
  const fullName = (user) => {
    return `${user.first_name}  ${user.last_name}`;
  };

  return (
    <Grid item sx={{ display: "flex" }}>
      <Grid item sx={{ mr: 1 }}>
        <Link
          underline="none"
          component={RouterLink}
          to={`/tenants/${tenant._id}`}
        >
          <Avatar
            sx={{ marginRight: "1em", width: 60, height: 60 }}
            alt={fullName(tenant.user)}
            src={tenant.user.image_url || DefaultUserImage}
          />
        </Link>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="primary">
          {fullName(tenant.user)}
        </Typography>
        <Typography
          sx={{ display: "block" }}
          variant="body2"
          color="text.primary"
        >
          {tenant.user.phone_number}
        </Typography>
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {tenant.user.email}
        </Typography>
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          Unit: {tenant.unit.name}
        </Typography>
      </Grid>
    </Grid>
  );
}
