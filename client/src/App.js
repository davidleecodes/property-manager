import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Properties from "./pages/Properties/Properties";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants/Tenants";
import Maintenances from "./pages/Maintenances/Maintenances";
import Invoices from "./pages/Invoices/Invoices";
import Login from "./pages/Login/Login";
import Leases from "./pages/Leases/Leases";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Properties} />
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/properties/:id" component={Properties} />
          <Route exact path="/properties" component={Properties} />

          <Route exact path="/tenants/:id" component={Tenants} />
          <Route exact path="/tenants" component={Tenants} />

          <Route exact path="/maintenances/:id" component={Maintenances} />
          <Route exact path="/maintenances" component={Maintenances} />

          <Route exact path="/invoices/:id" component={Invoices} />
          <Route exact path="/invoices" component={Invoices} />

          <Route exact path="/leases/:id" component={Leases} />
          <Route exact path="/leases" component={Leases} />

          <Route exact path="/login" component={Login} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
