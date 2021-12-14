import Container from "@mui/material/Container";
import PropertyForm from "../components/forms/PropertyForm";
import UserForm from "../components/forms/UserForm";
import MaintenanceForm from "../components/forms/MaintenanceForm";
import { Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      Dashboard
      <Grid container spacing={3}>
        <PropertyForm />
        <UserForm />
        <MaintenanceForm />
      </Grid>
    </Container>
  );
}
