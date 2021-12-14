import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { newProperty, editProperty } from "../../helpers/APICalls/property";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import FormikTextField from "./FormikTextField";
import FormikMultiText from "./FormikMultiText";
import FormikImage from "./FormikImage";
import Paper from "@mui/material/Paper";

export default function PropertyForm({ currentProperty }) {
  const history = useHistory();
  const defaultPropertyImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcgWFaoPPHUiSVNu9GCJRhgPcsVZg9RdpOe8FLH5AOh6Ha7E-BYhUEcjTtN-rShJgo2Rw&usqp=CAU";
  const initialValues = {
    name: "",
    units: [],
    image_url: "",
    street_name: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  };

  if (currentProperty) {
    initialValues.name = currentProperty.name;
    initialValues.image_url = currentProperty.image_url;
    initialValues.street_name = currentProperty.address.street_name;
    initialValues.street_address = currentProperty.address.street_address;
    initialValues.city = currentProperty.address.city;
    initialValues.state = currentProperty.address.state;
    initialValues.zip_code = currentProperty.address.zip_code;
    initialValues.country = currentProperty.address.country;
    let currUnits = currentProperty.units.map((u) => ({
      _id: u._id,
      name: u.name,
    }));
    initialValues.units = currUnits;
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Property Name is required")
      .min(5, "Property Name is too short"),
    // units: Yup.array().of(Yup.string()).min(1, "units is required"),
    units: Yup.array().of(Yup.mixed()).min(1, "units is required"),
    image_url: Yup.mixed(),
    street_name: Yup.string().required("street name is required"),
    street_address: Yup.string().required("street address  is required"),
    city: Yup.string().required("city is required"),
    state: Yup.string().required("state is required"),
    zip_code: Yup.string().required("zip code is required"),
    country: Yup.string().required("country is required"),
  });
  function handleSubmit(values, { setSubmitting }) {
    if (currentProperty) {
      editProperty(currentProperty._id, values).then((data) => {
        setSubmitting(true);
        if (data.error) {
          console.error({ error: data.error.message });
          setSubmitting(false);
        } else if (data.success) {
          setSubmitting(false);
          history.go(0);
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
          setSubmitting(false);
        }
      });
    } else {
      newProperty(values).then((data) => {
        setSubmitting(true);
        if (data.error) {
          console.error({ error: data.error.message });
          setSubmitting(false);
        } else if (data.success) {
          setSubmitting(false);
          history.push({
            pathname: `/properties/${data.success.property._id}`,
          });
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
          setSubmitting(false);
        }
      });
    }
  }

  return (
    <Grid item>
      <Paper sx={{ p: 2 }}>
        <Formik
          enableReinitialize
          validateOnChange
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
            <form onSubmit={handleSubmit} noValidate>
              <Typography variant="h6" gutterBottom>
                Property
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormikImage
                    label="image"
                    formikKey="image_url"
                    defaultImage={defaultPropertyImage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField label="Property name" formikKey="name" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    label="Street name"
                    formikKey="street_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    label="Street address"
                    formikKey="street_address"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormikTextField label="City" formikKey="city" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    label="State/Province/Region"
                    formikKey="state"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    label="Zip / Postal code"
                    formikKey="zip_code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField label="Country" formikKey="country" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormikMultiText label="Units" formikKey="units" />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : currentProperty ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}
