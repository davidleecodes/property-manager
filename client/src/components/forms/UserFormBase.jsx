import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import FormikTextField from "./FormikTextField";
import FormikImage from "./FormikImage";
import Paper from "@mui/material/Paper";
import { DefaultUserImage } from "../../images/images";

export default function UserFormBase({
  label,
  current,
  handleSubmit,
  handleDelete,
  handleCancel,
  deleteSubmitting,
  child,
  childNamespace,
  childValidationSchema,
  childInitialValues,
}) {
  const initialValues = {
    first_name: "",
    last_name: "",
    image_url: "",
    phone_number: "",
    email: "",
    password: "",
    ...childInitialValues,
  };
  if (current) {
    initialValues.first_name = current.first_name;
    initialValues.last_name = current.last_name;
    initialValues.image_url = current.image_url;
    initialValues.phone_number = current.phone_number;
    initialValues.email = current.email;
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("Property Name is required")
      .max(40, "Property Name is too long"),
    last_name: Yup.string().required("last_name is required"),
    image_url: Yup.mixed(),
    phone_number: Yup.string().required("phone_number is required"),
    email: Yup.string().email().required("email is required"),
    password: current
      ? Yup.string()
      : Yup.string().required("password is required"),
    ...childValidationSchema,
  });

  return (
    <Grid item>
      <Paper sx={{ p: 2 }}>
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
          }) => {
            return (
              <form onSubmit={handleSubmit} noValidate>
                <Typography component="h2" variant="h6" color="primary">
                  {label}
                </Typography>
                <Grid container spacing={3}>
                  {child(values, childNamespace)}
                  <Grid item xs={12}>
                    <FormikImage
                      label="image"
                      formikKey="image_url"
                      defaultImage={DefaultUserImage}
                      avatar
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormikTextField
                      label="First Name"
                      formikKey="first_name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikTextField label="Last Name" formikKey="last_name" />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormikTextField
                      label="Phone Number"
                      formikKey="phone_number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikTextField label="Email" formikKey="email" />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormikTextField label="Password" formikKey="password" />
                  </Grid>

                  <Grid item container spacing={1} justifyContent="flex-end">
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        {isSubmitting ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : current ? (
                          "Update"
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </Grid>
                    {current && (
                      <>
                        <Grid item>
                          <Button onClick={handleDelete} variant="outlined">
                            {deleteSubmitting ? (
                              <CircularProgress style={{ color: "white" }} />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </Grid>
                      </>
                    )}
                    {handleCancel && (
                      <Grid item>
                        <Button onClick={handleCancel} variant="outlined">
                          Cancel
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </Grid>
  );
}
