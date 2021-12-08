import React, { useState, useEffect } from "react";
import { getMaintenanceForId } from "../../helpers/APICalls/maintenance";
import { Grid } from "@mui/material";
import MaintenanceHeader from "./MaintenanceHeader";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "./../../helpers/dateFormatter";

export default function MaintenanceView({ maintenanceId }) {
  const [maintenanceData, setMaintenanceData] = useState();
  useEffect(() => {
    if (maintenanceId) {
      getMaintenanceForId(maintenanceId).then((res) => {
        setMaintenanceData(res);
      });
    }
  }, [maintenanceId]);

  const maintenanceColumns = [
    {
      label: "Date",
      content: (maintenance) => <span>{dateFormatter(maintenance.date)}</span>,
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
            : maintenance.tenant && maintenance.tenant.unit.name}
        </span>
      ),
    },
    {
      label: "Status",
      content: (maintenance) => <span>{maintenance.status}</span>,
    },
  ];

  return (
    <LoadingView
      data={maintenanceData}
      loadingState={(data) => !data}
      notFoundState={(data) => data.message}
    >
      {maintenanceData && (
        <Grid container spacing={3}>
          <MaintenanceHeader currentMaintenance={maintenanceData} />
          <Grid item xs={12}>
            <SingleTableView
              label={"Maintenance"}
              data={[maintenanceData]}
              columns={maintenanceColumns}
            >
              <Grid container spacing={0.5} sx={{ mt: 2 }}>
                {maintenanceData.media &&
                  maintenanceData.media.map((media, idx) => (
                    <Grid item sx={{ mr: 1 }} key={idx}>
                      <img
                        src={media}
                        alt={maintenanceData.issue}
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
            </SingleTableView>
          </Grid>
        </Grid>
      )}
    </LoadingView>
  );
}
