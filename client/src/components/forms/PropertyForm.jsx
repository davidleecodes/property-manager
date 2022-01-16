import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  newProperty,
  editProperty,
  deleteProperty,
} from "../../helpers/APICalls/property";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import FormikTextField from "./FormikTextField";
import FormikMultiText from "./FormikMultiText";
import FormikImage from "./FormikImage";
import Paper from "@mui/material/Paper";
import { DefaultPropertyImage } from "../../images/images";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";

export default function PropertyForm({ currentProperty, handleCancel }) {
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

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
        const onSuccess = () => history.go(0);
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      newProperty(values).then((data) => {
        const onSuccess = () => {
          history.push(`/properties/${data.success.property._id}`);
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    }
  }
  function handleDelete() {
    deleteProperty(currentProperty._id).then((data) => {
      function onSuccess(data) {
        history.push({
          pathname: `/properties`,
          state: { properties: data.success.propertyList },
        });
      }
      submittedForm(
        updateSnackBarMessage,
        setDeleteSubmitting,
        data,
        onSuccess
      );
    });
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
              <Typography component="h2" variant="h6" color="primary">
                Property
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormikImage
                    label="image"
                    formikKey="image_url"
                    defaultImage={DefaultPropertyImage}
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
              <Grid item container spacing={1} justifyContent="flex-end">
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    {isSubmitting ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : currentProperty ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </Grid>
                {currentProperty && (
                  <>
                    <Grid item>
                      <Button onClick={handleDelete} variant="outlined">
                        Delete
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={handleCancel} variant="outlined">
                        Cancel
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}
