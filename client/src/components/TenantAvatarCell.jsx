import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export default function TenantAvatarCell({ tenant, user }) {
  return (
    <Link underline="none" component={RouterLink} to={`/tenants/${tenant.id}`}>
      <Grid container direction="row" alignItems="center">
        <Avatar
          sx={{ marginRight: "1em" }}
          alt={user.first_name}
          src={user.image_url}
        />
        {`${user.first_name} ${user.last_name}`}
      </Grid>
    </Link>
  );
}
