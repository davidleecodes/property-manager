import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import SideNav from "../../components/SideNav";
import { DefaultPropertyImage } from "../../images/images";

export default function PropertiesSideNav({ selectedId, data }) {
  const itemContent = (property) => (
    <React.Fragment>
      <ListItemIcon sx={{ paddingRight: "2ch" }}>
        <img
          alt={property.name}
          src={property.image_url || DefaultPropertyImage}
          style={{ width: "100px", height: "60px", objectFit: "cover" }}
          loading="lazy"
        />
      </ListItemIcon>

      <ListItemText
        primary={property.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Units:{property.units.length}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Availability:
              {property.units.filter((p) => !p.tenants.length > 0).length}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
  const sortParams = [
    { label: "name", terms: [(item) => item.name] },
    {
      label: "units",
      terms: [(item) => item.units],
    },
  ];
  const searchParms = (item) => item.name;
  const collapsedText = {
    primary: (item) => item.name,
    secondary: (item) => `${item.units.length} units`,
  };

  return (
    <SideNav
      selectedId={selectedId}
      data={data}
      path={"properties"}
      itemContent={itemContent}
      sortParams={sortParams}
      searchParms={searchParms}
      collapsedText={collapsedText}
      isAdd={true}
    />
  );
}
