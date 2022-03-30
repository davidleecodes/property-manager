import React from "react";
import SideNav from "../../components/SideNav";
import { Avatar } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { DefaultUserImage } from "../../images/images";
import CssBaseline from "@mui/material/CssBaseline";

export default function UserSideNav({ selectedId, data }) {
  const itemContent = (user) => (
    <React.Fragment>
      <CssBaseline />

      <ListItemAvatar>
        <Avatar
          sx={{ marginRight: "1em" }}
          alt={`${user.first_name}  ${user.last_name}`}
          src={user.image_url || DefaultUserImage}
        />
      </ListItemAvatar>

      <ListItemText
        primary={`${user.first_name}  ${user.last_name}`}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {user.account_type}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
  const sortParams = [
    { label: "name", terms: [(item) => item.first_name] },
    {
      label: "account",
      terms: [(item) => item.account_type, (item) => item.first_name],
    },
  ];
  const searchParms = (item) => item.name;

  const collapsedText = {
    primary: (item) => `${item.first_name} ${item.last_name}`,
    secondary: (item) => `${item.account_type}`,
  };
  return (
    <SideNav
      selectedId={selectedId}
      data={data}
      path={"users"}
      itemContent={itemContent}
      sortParams={sortParams}
      searchParms={searchParms}
      collapsedText={collapsedText}
      isAdd={true}
    />
  );
}
