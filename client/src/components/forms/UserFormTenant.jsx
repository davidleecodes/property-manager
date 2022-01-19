import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import {
  newTenant,
  editTenant,
  deleteTenant,
} from "../../helpers/APICalls/tenant";
import { useHistory } from "react-router-dom";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";
import UserFormBase from "./UserFormBase";
import FormikSelectField from "./FormikSelectField";
import { getProperties } from "../../helpers/APICalls/property";

export default function UserFormTenant({ current, handleCancel }) {
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    getProperties().then((res) => {
      setPropertyData(res);
    });
  }, []);

  const initialValues = {
    account_type: "tenant",
    property: "",
    unit: "",
  };

  if (current) {
    initialValues.property = current.property._id;
    initialValues.unit = current.unit._id;
  }

  const validationSchema = {
    property: Yup.string().required("property is required"),
    unit: Yup.string().required("unit is required"),
  };

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

  const child = (values, namespace) => (
    <>
      <Grid item xs={12} sm={6}>
        <FormikSelectField
          label="Property"
          formikKey={"property"}
          itemArray={propertyData}
          itemValue={(item) => item._id}
          itemLabel={(item) => item.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormikSelectField
          disabled={values.property === ""}
          label={values.property === "" ? "select property first" : "Unit"}
          formikKey={"unit"}
          itemArray={
            values.property && propertyData.length > 0
              ? propertyData.filter((p) => p._id === values.property)[0].units
              : [""]
          }
          itemValue={(item) => item._id}
          itemLabel={(item) => item.name}
        />
      </Grid>
    </>
  );

  return (
    <Grid item>
      <UserFormBase
        label="Tenant"
        current={current}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        deleteSubmitting={deleteSubmitting}
        child={child}
        childNamespace="tenant"
        childValidationSchema={validationSchema}
        childInitialValues={initialValues}
      />
    </Grid>
  );
}
