import React, { useState } from "react";
import Container from "@mui/material/Container";
import LoginForm from "../../components/forms/LoginForm";
import { Button } from "@mui/material";
import { login } from "../../helpers/APICalls/auth";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../context/useAuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function LogIn() {
  const history = useHistory();
  const { updateLoginContext } = useAuth();

  const demoLogin = (email, password, loginType) => {
    login(email, password, loginType).then((data) => {
      if (data.success) {
        updateLoginContext(data.success, false);
        history.push("/dashboard");
      }
    });
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label={"tenants"} value={0} />
          <Tab label={"staff"} value={1} />
        </TabList>
        <TabPanel value={0}>
          <LoginForm></LoginForm>
          <Grid container direction="column" sx={{ mt: 2 }} spacing={2}>
            <Button
              onClick={() => demoLogin("tenb1@gmail.com", "123", "tenant")}
            >
              Demo tenant b1 Login
            </Button>
            <Button
              onClick={() => demoLogin("tenb3@gmail.com", "123", "tenant")}
            >
              Demo tenant/super b3 Login
            </Button>
          </Grid>
        </TabPanel>
        <TabPanel value={1}>
          <LoginForm></LoginForm>
          <Grid container direction="column" sx={{ mt: 2 }} spacing={2}>
            <Button
              onClick={() => demoLogin("owner1@gmail.com", "123", "staff")}
            >
              Demo Owner1 Login
            </Button>
            <Button
              onClick={() => demoLogin("owner2@gmail.com", "123", "staff")}
            >
              Demo Owner2 Login
            </Button>
            <Button
              onClick={() => demoLogin("tenb3@gmail.com", "123", "staff")}
            >
              Demo tenant/super b3 Login
            </Button>
          </Grid>
        </TabPanel>
      </TabContext>
    </Container>
  );
}
