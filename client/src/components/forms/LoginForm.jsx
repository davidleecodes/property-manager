import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { NavLink as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextField from "../../components/forms/FormikTextField";
import { login } from "../../helpers/APICalls/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";

export default function LoginForm() {
  const history = useHistory();
  const { updateLoginContext } = useAuth();

  function handleSubmit(values, { setSubmitting }) {
    console.log(values);
    login(values.email, values.password).then((data) => {
      setSubmitting(true);
      if (data.error) {
        setSubmitting(false);
        // updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setSubmitting(false);
        console.log("LOGIN", data);
        updateLoginContext(data.success);
        history.push("/dashboard");
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        // updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("email is required"),
    password: Yup.string().required("password is required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <FormikTextField
                label="Email Address"
                formikKey="email"
                autoComplete="email"
                autoFocus
              />
              <FormikTextField
                label="Password"
                formikKey="password"
                type="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
