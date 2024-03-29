import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  newTenant,
  editTenant,
  deleteTenant,
} from "../../helpers/APICalls/tenant";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import { getProperties } from "../../helpers/APICalls/property";
import FormikTextField from "./FormikTextField";
import FormikSelectField from "./FormikSelectField";
import FormikImage from "./FormikImage";
import Paper from "@mui/material/Paper";
import { DefaultUserImage } from "../../images/images";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";

export default function UserForm({ current, handleCancel }) {
  const history = useHistory();
  const [propertyData, setPropertyData] = useState([]);
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
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
    { name: "owner", label: "Owner" },
  ];
  const initialValues = {
    first_name: "",
    last_name: "",
    image_url: "",
    phone_number: "",
    email: "",
    account_type: "",
    password: "",
    property: "",
    unit: "",
  };

  console.log(current);
  if (current) {
    initialValues.first_name = current.user.first_name;
    initialValues.last_name = current.user.last_name;
    initialValues.image_url = current.user.image_url;
    initialValues.phone_number = current.user.phone_number;
    initialValues.email = current.user.email;
    initialValues.account_type = current.user.account_type;
    // initialValues.password = current.user.password;
    initialValues.property = current.property._id;
    initialValues.unit = current.unit._id;
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("Property Name is required")
      .max(40, "Property Name is too long"),
    last_name: Yup.string().required("last_name is required"),
    image_url: Yup.mixed(),
    phone_number: Yup.string().required("phone_number is required"),
    email: Yup.string().email().required("email is required"),
    account_type: Yup.string().required("account_type is required"),
    password: current
      ? Yup.string()
      : Yup.string().required("password is required"),
    // property: Yup.string().required("property is required"),
    // unit: Yup.string().required("unit is required"),
    property: Yup.string(),
    unit: Yup.string(),
  });
  function handleSubmit(values, { setSubmitting }) {
    if (current) {
      editTenant(current.user._id, current._id, values).then((data) => {
        setSubmitting(true);
        const onSuccess = () => history.go(0);
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      newTenant(values).then((data) => {
        setSubmitting(true);
        if (data.error) {
          console.error({ error: data.error.message });
          setSubmitting(false);
        } else if (data.success) {
          setSubmitting(false);
          history.push({
            pathname: `/tenants/${data.success.tenant._id}`,
          });
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
          setSubmitting(false);
        }
      });
    }
  }

  function handleDelete() {
    deleteTenant(current._id).then((data) => {
      function onSuccess() {
        history.push({
          pathname: `/tenants`,
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
                  Tenant
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormikImage
                      label="image"
                      formikKey="image_url"
                      defaultImage={DefaultUserImage}
                      avatar
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormikSelectField
                      label="Property"
                      formikKey="property"
                      itemArray={propertyData}
                      itemValue={(item) => item._id}
                      itemLabel={(item) => item.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikSelectField
                      disabled={values.property === ""}
                      label={
                        values.property === ""
                          ? "select property first"
                          : "Unit"
                      }
                      formikKey="unit"
                      itemArray={
                        values.property && propertyData.length > 0
                          ? propertyData.filter(
                              (p) => p._id === values.property
                            )[0].units
                          : [""]
                      }
                      itemValue={(item) => item._id}
                      itemLabel={(item) => item.name}
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
                    <FormikSelectField
                      label="Account type"
                      formikKey="account_type"
                      itemArray={accountTypes}
                      itemValue={(item) => item.name}
                      itemLabel={(item) => item.label}
                    />
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
                            Delete
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
