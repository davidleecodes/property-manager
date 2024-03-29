import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Properties from "./pages/Properties/Properties";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants/Tenants";
import Users from "./pages/Users/Users";
import Maintenances from "./pages/Maintenances/Maintenances";
import Invoices from "./pages/Invoices/Invoices";
import Login from "./pages/Login/Login";
import Leases from "./pages/Leases/Leases";
import { SnackBarProvider } from "./context/useSnackbarContext";
import { AuthProvider } from "./context/useAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectLoggedInRoute from "./components/RedirectLoggedInRoute";
import Unauthorized from "./pages/Unauthorized";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import acct from "./helpers/accountTypes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <BrowserRouter>
          <AuthProvider>
            <NavBar></NavBar>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path="/dashboard" Comp={Dashboard} />

              <ProtectedRoute
                path="/properties/:id"
                Comp={Properties}
                allow={[acct.owner]}
              />
              <ProtectedRoute
                exact
                path="/properties"
                Comp={Properties}
                allow={[acct.owner]}
              />

              <ProtectedRoute
                exact
                path="/tenants/:id"
                Comp={Tenants}
                allow={[acct.owner]}
              />
              <ProtectedRoute
                exact
                path="/tenants"
                Comp={Tenants}
                allow={[acct.owner]}
              />

              <ProtectedRoute
                exact
                path="/users/:id"
                Comp={Users}
                allow={[acct.owner]}
              />

              <ProtectedRoute
                exact
                path="/users/"
                Comp={Users}
                allow={[acct.owner]}
              />

              <ProtectedRoute
                exact
                path="/maintenances/:id"
                Comp={Maintenances}
              />
              <ProtectedRoute exact path="/maintenances" Comp={Maintenances} />

              <ProtectedRoute exact path="/invoices/:id" Comp={Invoices} />
              <ProtectedRoute exact path="/invoices" Comp={Invoices} />

              <ProtectedRoute exact path="/leases/:id" Comp={Leases} />
              <ProtectedRoute exact path="/leases" Comp={Leases} />

              <ProtectedRoute exact path="/profile" Comp={Profile} />
              <RedirectLoggedInRoute exact path="/login" Comp={Login} />
              <Route exact path="/signup" component={Signup} />

              <Route exact path="/unauthorized" component={Unauthorized} />

              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
