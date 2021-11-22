import React from "react";
import SideNav from "../../components/SideNav";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import currencyformatter from "../../helpers/currencyFormatter";

export default function LeaseSideNav({ selectedId, data }) {
  const itemContent = (lease) => (
    <React.Fragment>
      <ListItemText
        primary={lease.property.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`${lease.user.first_name} ${lease.user.last_name}`} |{" "}
              {lease.location === "common" ? "common" : lease.tenant.unit}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {currencyformatter.format(lease.monthy_rent)} | {lease.end_date}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
  const sortParams = [
    {
      label: "location",
      terms: [(item) => item.property.name, (item) => item.tenant.unit],
    },
  ];
  const searchParms = (item) => item.name;
  const collapsedText = {
    primary: (item) => `${item.user.first_name} ${item.user.last_name}`,
    secondary: (item) => `${item.end_date}`,
  };
  return (
    <SideNav
      selectedId={selectedId}
      data={data}
      path={"leases"}
      itemContent={itemContent}
      sortParams={sortParams}
      searchParms={searchParms}
      collapsedText={collapsedText}
    />
  );
}
