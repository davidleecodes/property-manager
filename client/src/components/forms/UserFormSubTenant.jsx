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
import FormikSelectField from "./FormikSelectField";
import Paper from "@mui/material/Paper";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";
import UserFormSub, {
  userInitialValues,
  userValidationSchema,
} from "./UserFormSub";

export default function UserFormSubTenant({ current, handleCancel }) {
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

  const initialValues = {
    account_type: "tenant",
    property: "",
    unit: "",
    user: userInitialValues,
  };

  console.log(current);
  if (current) {
    initialValues.account_type = current.user.account_type;
    initialValues.property = current.property._id;
    initialValues.unit = current.unit._id;
  }

  const validationSchema = Yup.object().shape({
    account_type: Yup.string().required("account_type is required"),
    property: Yup.string(),
    unit: Yup.string(),
    user: userValidationSchema,
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
        const onSuccess = () => {
          history.push(`/tenants/${data.success.tenant._id}`);
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
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
                  <UserFormSub namespace="user" />
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
