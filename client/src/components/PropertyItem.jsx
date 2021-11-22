import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export default function PropertyItem({ property }) {
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
          component={RouterLink}
          to={`/properties/${property.id}`}
        >
          <img
            alt={property.name}
            src={property.image_url}
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
          {property.units} | Availability:
          {property.units - property.occupied_units}
        </Typography>
      </Grid>
    </Grid>
  );
}
