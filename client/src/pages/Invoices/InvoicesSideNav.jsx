import React from "react";
import SideNav from "../../components/SideNav";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function InvoiceSideNav({ selectedId, data }) {
  const itemContent = (invoice) => (
    <React.Fragment>
      <ListItemText
        primary={invoice.property.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`${invoice.user.first_name} ${invoice.user.last_name}`} |{" "}
              {invoice.location === "common" ? "common" : invoice.tenant.unit}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {invoice.due_date} | {invoice.paid_date ? "paid" : "pending"}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
  const sortParams = [
    // { label: "date", terms: [(item) => item.date] },
    {
      label: "location",
      terms: [(item) => item.property.name, (item) => item.tenant.unit],
    },
  ];
  const searchParms = (item) => item.name;
  const collapsedText = {
    primary: (item) => `${item.user.first_name} ${item.user.last_name}`,
    secondary: (item) => `${item.due_date}`,
  };
  return (
    <SideNav
      selectedId={selectedId}
      data={data}
      path={"invoices"}
      itemContent={itemContent}
      sortParams={sortParams}
      searchParms={searchParms}
      collapsedText={collapsedText}
    />
  );
}
