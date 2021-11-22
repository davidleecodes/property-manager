import React from "react";
import { Grid } from "@mui/material";
import MaintenanceHeader from "./MaintenanceHeader";
import Paper from "@mui/material/Paper";
import TableView from "../../components/TableView";
import Typography from "@mui/material/Typography";

export default function MaintenanceView({ maintenanceId, currentMaintenance }) {
  const maintenanceColumns = [
    {
      label: "Date",
      content: (maintenance) => <span>{maintenance.date}</span>,
    },

    {
      label: "Issue",
      content: (maintenance) => <span>{maintenance.issue}</span>,
    },
    {
      label: "Location",
      content: (maintenance) => (
        <span>
          {maintenance.location === "common"
            ? "common"
            : maintenance.tenant && maintenance.tenant.unit}
        </span>
      ),
    },
    {
      label: "Status",
      content: (maintenance) => <span>{maintenance.status}</span>,
    },
  ];
  return (
    <Grid container spacing={3}>
      <MaintenanceHeader
        maintenanceId={maintenanceId}
        currentMaintenance={currentMaintenance}
      />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography component="h2" variant="h6" color="primary">
            Maintance
          </Typography>
          <TableView
            data={[currentMaintenance]}
            columns={maintenanceColumns}
          ></TableView>
          {/* </Paper> */}

          {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mt: 2 }}> */}
          <Grid container spacing={0.5} sx={{ mt: 2 }}>
            {currentMaintenance.media &&
              currentMaintenance.media.map((media, idx) => (
                <Grid item sx={{ mr: 1 }} key={idx}>
                  <img
                    src={media}
                    alt={currentMaintenance.issue}
                    loading="lazy"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
