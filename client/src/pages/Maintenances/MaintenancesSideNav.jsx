import React from "react";
import SideNav from "../../components/SideNav";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function MaintenanceSideNav({ selectedId, data }) {
  const itemContent = (maintenance) => (
    <React.Fragment>
      <ListItemText
        primary={maintenance.property.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {maintenance.location === "common"
                ? "common"
                : maintenance.tenant.unit}{" "}
              | {maintenance.issue}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {maintenance.date} | {maintenance.status}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
  const sortParams = [
    { label: "date", terms: [(item) => item.date] },
    {
      label: "location",
      terms: [(item) => item.property.name, (item) => item.tenant.unit],
    },
  ];
  const searchParms = (item) => item.name;
  const collapsedText = {
    primary: (item) => item.issue,
    secondary: (maintenance) =>
      maintenance.location === "common" ? "common" : maintenance.tenant.unit,
  };
  return (
    <SideNav
      selectedId={selectedId}
      data={data}
      path={"maintenances"}
      itemContent={itemContent}
      sortParams={sortParams}
      searchParms={searchParms}
      collapsedText={collapsedText}
    />
  );
}
