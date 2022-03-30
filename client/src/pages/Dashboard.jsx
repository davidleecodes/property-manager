import Container from "@mui/material/Container";
import PropertyForm from "../components/forms/PropertyForm";
import MaintenanceForm from "../components/forms/MaintenanceForm";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function Dashboard() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <CssBaseline />
      Dashboard
      <Grid container spacing={3}>
        {/* <PropertyForm /> */}
        {/* <MaintenanceForm /> */}
      </Grid>
    </Container>
  );
}
