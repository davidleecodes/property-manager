import React, { useState, useEffect } from "react";
import { getMaintenanceForId } from "../../helpers/APICalls/maintenance";
import { Grid } from "@mui/material";
import MaintenanceHeader from "./MaintenanceHeader";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "./../../helpers/dateFormatter";
import MaintenanceForm from "../../components/forms/MaintenanceForm";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../context/useAuthContext";

export default function MaintenanceView({ maintenanceId }) {
  const { loggedInUser } = useAuth();
  const [maintenanceData, setMaintenanceData] = useState();
  const isAdd = maintenanceId === "add";

  useEffect(() => {
    setMaintenanceData(null);
    if (!isAdd && maintenanceId) {
      getMaintenanceForId(maintenanceId).then((res) => {
        setMaintenanceData(res);
      });
    }
  }, [maintenanceId, isAdd]);

  const maintenanceColumns = [
    {
      label: "Date",
      content: (maintenance) => <span>{dateFormatter(maintenance.date)}</span>,
    },

    {
      label: "Issue",
      content: (maintenance) => <span>{maintenance.title}</span>,
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

  if (isAdd) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaintenanceForm />
        </Grid>
      </Grid>
    );
  }

  return (
    <LoadingView
      data={maintenanceData}
      loadingState={(data) => !data}
      notFoundState={(data) => data.message}
    >
      {maintenanceData && (
        <Grid container spacing={3}>
          <MaintenanceHeader currentMaintenance={maintenanceData} />
          {/* <MaintenanceForm currentMaintenance={maintenanceData} /> */}
          <Grid item xs={12}>
            <SingleTableView
              label={"Maintenance"}
              data={[maintenanceData]}
              columns={maintenanceColumns}
              toggleLabel="edit"
              toggleContent={
                <MaintenanceForm currentMaintenance={maintenanceData} />
              }
            >
              <Grid container spacing={0.5} sx={{ mt: 2 }}>
                {maintenanceData.media &&
                  maintenanceData.media.map((media, idx) => (
                    <Grid item sx={{ mr: 1 }} key={idx}>
                      <img
                        src={media}
                        alt={maintenanceData.title}
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
              <Typography variant="body2">{maintenanceData.body}</Typography>
            </SingleTableView>
          </Grid>
        </Grid>
      )}
    </LoadingView>
  );
}
