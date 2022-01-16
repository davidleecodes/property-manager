import React from "react";
import Container from "@mui/material/Container";
import LoginForm from "../../components/forms/LoginForm";
import { Button } from "@mui/material";
import { login } from "../../helpers/APICalls/auth";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../context/useAuthContext";

export default function LogIn() {
  const history = useHistory();
  const { updateLoginContext } = useAuth();

  const demoLogin = (email, password) => {
    login(email, password).then((data) => {
      if (data.success) {
        updateLoginContext(data.success, false);
        history.push("/dashboard");
      }
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <LoginForm></LoginForm>

      <Grid container direction="column" sx={{ mt: 2 }} spacing={2}>
        <Button onClick={() => demoLogin("owner1@gmail.com", "123")}>
          Demo Owner1 Login
        </Button>
        <Button onClick={() => demoLogin("owner2@gmail.com", "123")}>
          Demo Owner2 Login
        </Button>
        <Button onClick={() => demoLogin("tenb1@gmail.com", "123")}>
          tenb1 Login
        </Button>
      </Grid>
    </Container>
  );
}
