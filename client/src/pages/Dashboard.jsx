import Container from "@mui/material/Container";
import PropertyForm from "../components/PropertyForm";
import UserForm from "../components/UserForm";
import MaintenanceForm from "../components/MaintenanceForm";

export default function Dashboard() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      Dashboard
      <PropertyForm />
      <UserForm />
      <MaintenanceForm />
    </Container>
  );
}
