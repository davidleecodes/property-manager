import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export default function TenantAvatarCell({ tenant }) {
  const fullName = (user) => {
    return `${user.first_name}  ${user.last_name}`;
  };
  if (tenant) {
    return (
      <Link
        underline="none"
        component={RouterLink}
        to={`/tenants/${tenant._id}`}
      >
        <Grid container direction="row" alignItems="center">
          <Avatar
            sx={{ marginRight: "1em" }}
            alt={fullName(tenant.user)}
            src={tenant.user.image_url}
          />
          {fullName(tenant.user)}
        </Grid>
      </Link>
    );
  }
  return null;
}
