import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { newLease, editLease, deleteLease } from "../../helpers/APICalls/lease";
import { CircularProgress } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import FormikTextField from "./FormikTextField";
import FormikSelectField from "./FormikSelectField";
import { getTenants } from "../../helpers/APICalls/tenant";
import FormikDate from "./FormikDate";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";
import { useAuth } from "../../context/useAuthContext";
import acct from "../../helpers/accountTypes";

export default function LeaseForm({ current, handleCancel, tenantList }) {
  const history = useHistory();
  const location = useLocation();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const isTenant = loggedInUser.account_type === acct.tenant;

  const initialValues = {
    tenant: "",
    monthly_rent: "",
    start_date: "",
    end_date: "",
  };

  if (current) {
    initialValues.tenant = current.tenant._id;
    initialValues.monthly_rent = current.monthly_rent;
    initialValues.start_date = current.start_date;
    initialValues.end_date = current.end_date;
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

  const validationSchema = Yup.object().shape({
    tenant: Yup.string().required("tenant is required"),
    monthly_rent: Yup.string().required("amount is required"),
    start_date: Yup.date().required("start_date is required"),
    end_date: Yup.date().required("end_date is required"),
  });
  function handleSubmit(values, { setSubmitting }) {
    console.log("hit");
    if (current) {
      editLease(current._id, values).then((data) => {
        const onSuccess = () => {
          history.go(0);
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      values.property = tenantData.filter(
        (t) => t._id === values.tenant
      )[0].property;
      newLease(values).then((data) => {
        const onSuccess = () => {
          if (location.pathname.match(/lease/)) {
            history.push(`/invoices/${data.success.lease._id}`);
            history.go();
          } else {
            history.go(0);
          }
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    }
  }
  function handleDelete() {
    deleteLease(current._id).then((data) => {
      function onSuccess(data) {
        if (location.pathname.match(/invoices/)) {
          history.push(`/invoices`);
          history.go();
        } else {
          history.go(0);
        }
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
                Lease
              </Typography>

              <Grid container spacing={3}>
                {!current && (
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
                  </>
                )}
                <Grid item xs={12}>
                  <FormikTextField
                    label="monthly_rent"
                    formikKey="monthly_rent"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikDate label="start_date" formikKey="start_date" />
                </Grid>{" "}
                <Grid item xs={12}>
                  <FormikDate label="end_date" formikKey="end_date" />
                </Grid>
                {/*  */}
                <Grid container item spacing={1} justifyContent="flex-end">
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
