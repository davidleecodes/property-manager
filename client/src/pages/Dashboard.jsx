import Container from "@mui/material/Container";
import PropertyForm from "../components/forms/PropertyForm";
import MaintenanceForm from "../components/forms/MaintenanceForm";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export default function Dashboard() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <CssBaseline />
      Dashboard
      <Grid container spacing={3}>
        <Doughnut data={data} />
        {/* <PropertyForm /> */}
        {/* <MaintenanceForm /> */}
      </Grid>
    </Container>
  );
}
