import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { newProperty } from "../helpers/APICalls/property";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import FormikTextField from "./FormikTextField";
import FormikSelectField from "./FormikSelectField";
import { getTenants } from "../helpers/APICalls/tenant";
import FormikMultiImage from "./FormikMultiImage";
export default function PropertyForm() {
  const history = useHistory();

  const initialValues = {
    tenantId: "",
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
    tenantId: Yup.string().required("tenant is required"),
    issue: Yup.string().required("city is required"),
    status: Yup.string().required("state is required"),
    location: Yup.string().required("location is required"),
    media: Yup.array().of(Yup.mixed()).min(1, "media is required"),
  });
  function handleSubmit({ issue, status, media }, { setSubmitting }) {
    let maintenance = {
      issue,
      status,
      media,
    };
    console.log(maintenance, setSubmitting);

    newProperty(maintenance).then((data) => {
      setSubmitting(true);
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
      } else if (data.success) {
        setSubmitting(false);
        history.push({
          pathname: "/properties",
        });
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
      }
    });
  }

  return (
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
                formikKey="tenantId"
                itemArray={tenantData}
                itemValue={(item) => item._id}
                itemLabel={(item) =>
                  `${item.user.first_name} ${item.user.last_name}`
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormikSelectField
                disabled={values.tenantId === ""}
                label={
                  values.tenantId === "" ? "select tenant first" : "location"
                }
                formikKey="location"
                itemArray={[
                  "common",
                  values.tenantId &&
                    tenantData.filter((t) => t._id === values.tenantId)[0].unit,
                ]}
                itemValue={(item) => item}
                itemLabel={(item) => item}
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
              <FormikMultiImage label="images" formikKey="media" />
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
  );
}
