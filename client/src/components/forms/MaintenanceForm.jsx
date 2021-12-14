import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { newMaintenance } from "../../helpers/APICalls/maintenance";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import FormikTextField from "./FormikTextField";
import FormikSelectField from "./FormikSelectField";
import { getTenants } from "../../helpers/APICalls/tenant";
import FormikMultiImage from "./FormikMultiImage";
import Paper from "@mui/material/Paper";

export default function PropertyForm() {
  const history = useHistory();

  const initialValues = {
    tenant: "",
    issue: "",
    status: "",
    media: [],
    location: "",
  };
  const [tenantData, setTenantData] = useState([]);
  useEffect(() => {
    getTenants().then((res) => {
      setTenantData(res);
    });
  }, []);
  const statusTypes = [
    { name: "open", label: "open" },
    { name: "close", label: "close" },
    { name: "pending", label: "pending" },
  ];

  const validationSchema = Yup.object().shape({
    tenant: Yup.string().required("tenant is required"),
    issue: Yup.string().required("issue is required"),
    status: Yup.string().required("state is required"),
    location: Yup.string().required("location is required"),
    media: Yup.array().of(Yup.mixed()).min(1, "at least one image is required"),
  });
  function handleSubmit(values, { setSubmitting }) {
    values.property = tenantData.filter(
      (t) => t._id === values.tenant
    )[0].property;
    newMaintenance(values).then((data) => {
      setSubmitting(true);
      console.log(data);
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
      } else if (data.success) {
        setSubmitting(false);
        history.push({
          pathname: `/maintenances/${data.success.maintenance._id}`,
        });
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
      }
    });
  }

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Formik
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

                <Grid item xs={12} sm={6}>
                  <FormikSelectField
                    disabled={values.tenant === ""}
                    label={
                      values.tenant === "" ? "select tenant first" : "location"
                    }
                    formikKey="location"
                    itemArray={[
                      { _id: "common", name: "common" },
                      values.tenant &&
                        tenantData.filter((t) => t._id === values.tenant)[0]
                          .unit,
                    ]}
                    itemValue={(item) => item._id}
                    itemLabel={(item) => item.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    label="Issue (short description)"
                    formikKey="issue"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    label="Detail( detailed description)"
                    formikKey="detail"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikMultiImage label="Images" formikKey="media" />
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
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}
