import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  newMaintenance,
  editMaintenance,
  deleteMaintenance,
} from "../../helpers/APICalls/maintenance";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import FormikTextField from "./FormikTextField";
import FormikSelectField from "./FormikSelectField";
import { getTenants } from "../../helpers/APICalls/tenant";
import FormikMultiImage from "./FormikMultiImage";
import Paper from "@mui/material/Paper";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";
import { useAuth } from "../../context/useAuthContext";
import acct from "../../helpers/accoutTypes";
export default function MaintenanceForm({
  currentMaintenance,
  handleCancel,
  tenantList,
}) {
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const isTenant = loggedInUser.account_type === acct.tenant;

  const initialValues = {
    tenant: "",
    title: "",
    body: "",
    status: "",
    media: [],
    location: "",
  };

  if (currentMaintenance) {
    initialValues.tenant = currentMaintenance.tenant._id;
    initialValues.title = currentMaintenance.title;
    initialValues.body = currentMaintenance.body;
    initialValues.status = currentMaintenance.status;
    initialValues.location = currentMaintenance.location;
    initialValues.media = currentMaintenance.media;
  }
  if (isTenant) {
    initialValues.tenant = loggedInUser.tenant._id;
  }
  const [tenantData, setTenantData] = useState([]);
  useEffect(() => {
    if (isTenant) {
      setTenantData([loggedInUser.tenant]);
    } else if (tenantList) {
      setTenantData(tenantList);
    } else {
      getTenants().then((res) => {
        setTenantData(res);
      });
    }
  }, [isTenant, loggedInUser, tenantList]);
  const statusTypes = [
    { name: "open", label: "open" },
    { name: "close", label: "close" },
    { name: "pending", label: "pending" },
  ];

  const validationSchema = Yup.object().shape({
    tenant: Yup.string().required("tenant is required"),
    title: Yup.string().required("title is required"),
    body: Yup.string().required("body is required"),
    status: Yup.string().required("state is required"),
    location: Yup.string().required("location is required"),
    media: Yup.array().of(Yup.mixed()).min(1, "at least one image is required"),
  });
  function handleSubmit(values, { setSubmitting }) {
    if (currentMaintenance) {
      editMaintenance(currentMaintenance._id, values).then((data) => {
        const onSuccess = () => history.go(0);
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      values.property = tenantData.filter(
        (t) => t._id === values.tenant
      )[0].property;
      newMaintenance(values).then((data) => {
        const onSuccess = () => {
          history.push(`/maintenances/${data.success.maintenance._id}`);
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    }
  }
  function handleDelete() {
    deleteMaintenance(currentMaintenance).then((data) => {
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
    <Grid item xs={12}>
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
                Maintenance
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormikSelectField
                    label="Status"
                    formikKey="status"
                    itemArray={statusTypes}
                    itemValue={(item) => item.name}
                    itemLabel={(item) => item.label}
                  />
                </Grid>
                {!currentMaintenance && (
                  <>
                    {!isTenant && (
                      <Grid item xs={12} sm={6}>
                        <FormikSelectField
                          label="Tenant"
                          formikKey="tenant"
                          itemArray={tenantData}
                          itemValue={(item) => item._id}
                          itemLabel={(item) =>
                            `${item.user.first_name} ${item.user.last_name}`
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <FormikSelectField
                        disabled={values.tenant === ""}
                        label={
                          values.tenant === ""
                            ? "select tenant first"
                            : "location"
                        }
                        formikKey="location"
                        itemArray={[
                          { _id: "common", name: "common" },
                          values.tenant &&
                            tenantData.length > 0 &&
                            tenantData.filter((t) => t._id === values.tenant)[0]
                              .unit,
                        ]}
                        itemValue={(item) => item._id}
                        itemLabel={(item) => item.name}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <FormikTextField
                    label="Title (short description)"
                    formikKey="title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    label="Body( detailed description)"
                    formikKey="body"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikMultiImage label="Images" formikKey="media" />
                </Grid>

                <Grid container item spacing={1} justifyContent="flex-end">
                  <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                      {isSubmitting ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : currentMaintenance ? (
                        "Update"
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </Grid>

                  {currentMaintenance && (
                    <Grid item>
                      <Button onClick={handleDelete} variant="outlined">
                        Delete
                      </Button>
                    </Grid>
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
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}
