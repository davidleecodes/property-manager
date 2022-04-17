import React, { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { newUser, editUser, deleteUser } from "../../helpers/APICalls/auth";
import { useHistory } from "react-router-dom";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";
import UserFormBase from "./UserFormBase";
import FormikSelectField from "./FormikSelectField";
import FormikSwitch from "./FormikSwitch";
import FormikRadioBtns from "./FormikRadioBtns";
import { getProperties } from "../../helpers/APICalls/property";

export default function UserFormExt({ current, handleCancel, initalProperty }) {
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [propertyData, setPropertyData] = useState([]);

  console.log(current, handleCancel, "ININT", initalProperty);
  useEffect(() => {
    if (initalProperty) {
      setPropertyData([initalProperty]);
    } else {
      getProperties().then((res) => {
        setPropertyData(res);
      });
    }
  }, [initalProperty]);

  const acct_types = {
    none: "none",
    owner: "owner",
    admin: "admin",
    super: "super",
  };
  const initialValues = {
    // account_type: "tenant",
    property: "",
    unit: "",
    is_tenant: false,
    admin_type: "",
  };

  if (current) {
    initialValues.property = current.tenant.property._id;
    initialValues.unit = current.tenant.unit._id;
    initialValues.is_tenant = current.is_tenant;
    initialValues.admin_type = current.admin_type;
  }
  if (initalProperty) {
    initialValues.property = initalProperty._id;
  }

  const validationSchema = {
    property: Yup.string().required("property is required"),
    unit: Yup.string().required("unit is required"),
    is_tenant: Yup.boolean(),
    admin_type: Yup.string(),
  };

  function handleSubmit(values, { setSubmitting }) {
    if (current) {
      editUser(current._id, current.tenant._id, values).then((data) => {
        setSubmitting(true);
        const onSuccess = () => history.go(0);
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      newUser(values).then((data) => {
        const onSuccess = () => {
          history.push(`/tenants/${data.success.tenant._id}`);
          history.go();
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    }
  }

  function handleDelete() {
    deleteUser(current._id).then((data) => {
      function onSuccess() {
        history.push({
          pathname: `/tenants`,
        });
        history.go();
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
      {!initalProperty && (
        <Grid item xs={12} sm={6}>
          <FormikSelectField
            label="Property"
            formikKey={"property"}
            itemArray={propertyData}
            itemValue={(item) => item._id}
            itemLabel={(item) => item.name}
          />
        </Grid>
      )}

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
        <FormikSwitch label="is Tenant" formikKey={"is_tenant"}></FormikSwitch>
        <FormikRadioBtns
          label="admin_type"
          formikKey={"admin_type"}
          options={acct_types}
        ></FormikRadioBtns>
      </Grid>
    </>
  );

  return (
    <Grid item>
      <UserFormBase
        label="Tenant"
        current={current && current.user ? current.user : current}
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
