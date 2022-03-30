import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  newInvoice,
  editInvoice,
  deleteInvoice,
} from "../../helpers/APICalls/invoice";
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

export default function InvoiceForm({ current, handleCancel, tenantList }) {
  const history = useHistory();
  const location = useLocation();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const isTenant = loggedInUser.account_type === acct.tenant;
  console.log(current);
  const initialValues = {
    tenant: "",
    amount: "",
    sent_date: "",
    due_date: "",
    paid_date: "",
    is_late: false,
  };
  if (current) {
    initialValues.tenant = current.tenant._id;
    initialValues.amount = current.amount;
    initialValues.sent_date = current.sent_date;
    initialValues.due_date = current.due_date;
    initialValues.paid_date = current.paid_date;
    initialValues.is_late = current.is_late;
  }
  if (isTenant) {
    initialValues.tenant = loggedInUser.tenant._id;
  }
  const [tenantData, setTenantData] = useState([]);
  useEffect(() => {
    if (isTenant) {
      setTenantData([loggedInUser.tenant]);
    } else if (current) {
      setTenantData([current.tenant]);
    } else if (tenantList) {
      setTenantData(tenantList);
    } else {
      getTenants().then((res) => {
        setTenantData(res);
      });
    }
  }, [isTenant, loggedInUser, tenantList, current]);
  console.log(initialValues);

  console.log(tenantData);

  const validationSchema = Yup.object().shape({
    tenant: Yup.string().required("tenant is required"),
    amount: Yup.string().required("amount is required"),
    sent_date: Yup.date().required("sent_date is required"),
    due_date: Yup.date().required("due_date is required"),
    // paid_date: Yup.date().required("paid_date is required"),
    // is_late: Yup.string().required("is_late is required"),
  });
  function handleSubmit(values, { setSubmitting }) {
    if (current) {
      editInvoice(current._id, values).then((data) => {
        const onSuccess = () => {
          history.go(0);
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      values.property = tenantData.filter(
        (t) => t._id === values.tenant
      )[0].property._id;
      newInvoice(values).then((data) => {
        const onSuccess = () => {
          if (location.pathname.match(/invoice/)) {
            history.push(`/invoices/${data.success.invoice._id}`);
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
    deleteInvoice(current._id).then((data) => {
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
                Invoice
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
                    label="amount"
                    formikKey="amount"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikDate label="sent_date" formikKey="sent_date" />
                </Grid>{" "}
                <Grid item xs={12}>
                  <FormikDate label="due_date" formikKey="due_date" />
                </Grid>
                <Grid item xs={12}>
                  <FormikDate label="paid_date" formikKey="paid_date" />
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
