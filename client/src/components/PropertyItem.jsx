import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { DefaultPropertyImage } from "../images/images";
import { useAuth } from "../context/useAuthContext";
import acct from "../helpers/accountTypes";

export default function PropertyItem({ property }) {
  const { loggedInUser } = useAuth();

  const fullAddress = (address) => {
    return (
      <React.Fragment>
        {`${address.street_name} ${address.street_address}`} <br />
        {`${address.city} ${address.state} ${address.zip_code}`}
      </React.Fragment>
    );
  };

  return (
    <Grid item sx={{ display: "flex" }}>
      <Grid item sx={{ mr: 1 }}>
        <Link
          underline="none"
          component={
            loggedInUser.account_type === acct.tenant ? Link : RouterLink
          }
          to={`/properties/${property._id}`}
        >
          <img
            alt={property.name}
            src={property.image_url || DefaultPropertyImage}
            loading="lazy"
            style={{ width: "100px", height: "60px", objectFit: "cover" }}
          />
        </Link>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="primary">
          {property.name}
        </Typography>
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {fullAddress(property.address)}
        </Typography>
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          Units:
          {property.units.length} | Availability:
          {property.units.filter((p) => !p.tenants.length > 0).length}
        </Typography>
      </Grid>
    </Grid>
  );
}
