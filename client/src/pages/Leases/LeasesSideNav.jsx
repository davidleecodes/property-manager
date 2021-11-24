import React from "react";
import SideNav from "../../components/SideNav";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import currencyformatter from "../../helpers/currencyFormatter";
import dateFormatter from "./../../helpers/dateFormatter";

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
              {`${lease.tenant.user.first_name} ${lease.tenant.user.last_name}`}{" "}
              | {lease.location === "common" ? "common" : lease.tenant.unit}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {currencyformatter.format(lease.monthly_rent)} |{" "}
              {dateFormatter(lease.end_date)}
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
    primary: (item) =>
      `${item.tenant.user.first_name} ${item.tenant.user.last_name}`,
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
