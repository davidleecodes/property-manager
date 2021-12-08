import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { newProperty } from "../helpers/APICalls/property";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import { getProperties } from "../helpers/APICalls/property";
import FormikTextField from "./FormikTextField";
import FormikSelectField from "./FormikSelectField";
import FormikImage from "./FormikImage";

export default function UserForm() {
  const defaultUserImage =
    "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
  const history = useHistory();
  const [propertyData, setPropertyData] = useState([]);
  useEffect(() => {
    getProperties().then((res) => {
      console.log(res);
      setPropertyData(res);
    });
  }, []);
  const accountTypes = [
    { name: "tenant", label: "Tenant" },
    { name: "admin", label: "Admin" },
    { name: "maintenance", label: "Maintenance" },
  ];
  const initialValues = {
    first_name: "",
    last_name: "",
    image_url: {},
    phone_number: "",
    email: "",
    account_type: "",
    username: "",
    password: "",
    propertyId: "",
    unit: "",
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("Property Name is required")
      .max(40, "Property Name is too long"),
    last_name: Yup.string().required("last_name is required"),
    image_url: Yup.mixed(),
    phone_number: Yup.string().required("phone_number is required"),
    email: Yup.string().email().required("email is required"),
    account_type: Yup.string().required("account_type is required"),
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
    propertyId: Yup.string().required("propertyId is required"),
    unit: Yup.string().required("unit is required"),
  });
  function handleSubmit(
    {
      first_name,
      last_name,
      image_url,
      phone_number,
      email,
      account_type,
      username,
      password,
      propertyId,
      unit,
    },
    { setSubmitting }
  ) {
    let user = {
      first_name,
      last_name,
      image_url,
      phone_number,
      email,
      account_type,
      username,
      password,
      propertyId,
      unit,
    };
    console.log(user, setSubmitting);

    // newProperty(user).then((data) => {
    //   setSubmitting(true);
    //   if (data.error) {
    //     console.error({ error: data.error.message });
    //     setSubmitting(false);
    //   } else if (data.success) {
    //     setSubmitting(false);
    //     history.push({
    //       pathname: "/properties",
    //     });
    //   } else {
    //     // should not get here from backend but this catch is for an unknown issue
    //     console.error({ data });
    //     setSubmitting(false);
    //   }
    // });
  }

  return (
    <Formik
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
            <Typography variant="h6" gutterBottom>
              Tenant
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormikImage
                  label="image"
                  formikKey="image_url"
                  defaultImage={defaultUserImage}
                  avatar
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormikSelectField
                  label="Property"
                  formikKey="propertyId"
                  itemArray={propertyData}
                  itemValue={(item) => item._id}
                  itemLabel={(item) => item.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikSelectField
                  disabled={values.propertyId === ""}
                  label={
                    values.propertyId === "" ? "select property first" : "Unit"
                  }
                  formikKey="unit"
                  itemArray={
                    values.propertyId
                      ? propertyData.filter(
                          (p) => p._id === values.propertyId
                        )[0].units
                      : [""]
                  }
                  itemValue={(item) => item.name}
                  itemLabel={(item) => item.name}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormikTextField label="First Name" formikKey="first_name" />
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
                <FormikSelectField
                  label="Account type"
                  formikKey="account_type"
                  itemArray={accountTypes}
                  itemValue={(item) => item.name}
                  itemLabel={(item) => item.label}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField label="Username" formikKey="username" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormikTextField label="Password" formikKey="password" />
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
                ) : (
                  "Create"
                )}
              </Button>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}
