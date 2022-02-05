import React from "react";
import SideNav from "../../components/SideNav";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import dateFormatter from "./../../helpers/dateFormatter";

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
              {`${invoice.tenant.user.first_name} ${invoice.tenant.user.last_name}`}{" "}
              |{" "}
              {invoice.location === "common"
                ? "common"
                : invoice.tenant.unit.name}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {dateFormatter(invoice.due_date)} |{" "}
              {invoice.paid_date ? "paid" : "pending"}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
  const sortParams = [
    {
      label: "location",
      terms: [(item) => item.property.name, (item) => item.tenant.unit.name],
    },
  ];
  const searchParms = (item) => item.name;
  const collapsedText = {
    primary: (item) =>
      `${item.tenant.user.first_name} ${item.tenant.user.last_name}`,
    secondary: (item) => `${dateFormatter(item.due_date)}`,
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
      isAdd={true}
    />
  );
}
