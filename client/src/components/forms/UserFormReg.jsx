import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { newUser, editUser, deleteUser } from "../../helpers/APICalls/auth";
import { useHistory } from "react-router-dom";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";
import UserFormBase from "./UserFormBase";
import * as Yup from "yup";
import FormikSwitch from "./FormikSwitch";

export default function UserFormReg({
  current,
  handleCancel,
  label,
  initValues,
  isHideDelete,
}) {
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const initialValues = {
    ...initValues,
  };

  if (!current) {
    initialValues.is_owner = false;
  }
  const validationSchema = {};
  if (!current) {
    validationSchema.is_owner = Yup.boolean().oneOf([true], "have to be owner");
  }
  function handleSubmit(values, { setSubmitting }) {
    if (current) {
      editUser(current._id, current._id, values).then((data) => {
        setSubmitting(true);
        const onSuccess = () => history.go(0);
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      let newValues = { ...values };
      if (newValues.is_owner) newValues.admin_type = "owner";
      newUser(newValues).then((data) => {
        const onSuccess = () => {
          history.push(`/dashboard`);
        };
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    }
  }

  function handleDelete() {
    deleteUser(current._id).then((data) => {
      function onSuccess() {
        history.push({
          pathname: `/dashboard`,
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

  function cancel() {
    if (handleCancel) handleCancel();
    else {
      history.go(-1);
    }
  }
  const child = (values, namespace) => (
    <>
      {!current && (
        <FormikSwitch label="is Owner" formikKey={"is_owner"}></FormikSwitch>
      )}
    </>
  );

  return (
    <Grid item>
      <UserFormBase
        label={label}
        current={current}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleCancel={cancel}
        deleteSubmitting={deleteSubmitting}
        child={child}
        childNamespace="owner"
        childValidationSchema={validationSchema}
        childInitialValues={initialValues}
        isHideDelete={isHideDelete}
      />
    </Grid>
  );
}
