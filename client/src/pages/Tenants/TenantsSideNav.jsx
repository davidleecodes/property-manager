import React from "react";
import SideNav from "../../components/SideNav";
import { Avatar } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { DefaultUserImage } from "../../images/images";

export default function TenantSideNav({ selectedId, data }) {
  const itemContent = (tenant) => (
    <React.Fragment>
      <ListItemAvatar>
        <Avatar
          sx={{ marginRight: "1em" }}
          alt={`${tenant.user.first_name}  ${tenant.user.last_name}`}
          src={tenant.user.image_url || DefaultUserImage}
        />
      </ListItemAvatar>

      <ListItemText
        primary={`${tenant.user.first_name}  ${tenant.user.last_name}`}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {tenant.property.address.street_address} | {tenant.unit.name}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
  const sortParams = [
    { label: "name", terms: [(item) => item.user.first_name] },
    {
      label: "location",
      terms: [(item) => item.property.name, (item) => item.unit.name],
    },
  ];
  const searchParms = (item) => item.name;

  const collapsedText = {
    primary: (item) => `${item.user.first_name} ${item.user.last_name}`,
    secondary: (item) => `${item.unit.name}`,
  };
  return (
    <SideNav
      selectedId={selectedId}
      data={data}
      path={"tenants"}
      itemContent={itemContent}
      sortParams={sortParams}
      searchParms={searchParms}
      collapsedText={collapsedText}
      isAdd={true}
    />
  );
}
