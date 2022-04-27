import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import PropertyForm from "../components/forms/PropertyForm";
import MaintenanceForm from "../components/forms/MaintenanceForm";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getProperties } from "../helpers/APICalls/property";

ChartJS.register(ArcElement, Tooltip, Legend);
// export const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
export default function Dashboard() {
  const [propertiesData, setPropertiesData] = useState([]);
  let totalUnits = 0;
  let occupiedUnits = 0;

  propertiesData.forEach((p) => {
    totalUnits += p.units.length;
    let temp = p.units.filter((p) => p.tenants.length > 0).length;
    console.log(temp);
    occupiedUnits += temp;
  });

  console.log(totalUnits, occupiedUnits);
  useEffect(() => {
    getProperties().then((res) => {
      console.log(res);
      setPropertiesData(res);
    });
  }, []);

  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "# of Votes",
        data: [totalUnits, occupiedUnits],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
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
