import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  newTenant,
  editTenant,
  deleteTenant,
} from "../../helpers/APICalls/tenant";
import { useHistory } from "react-router-dom";
import { useSnackBar } from "../../context/useSnackbarContext";
import { submittedForm } from "./formHelper";
import UserFormBase from "./UserFormBase";

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

  const validationSchema = {};

  function handleSubmit(values, { setSubmitting }) {
    if (current) {
      console.log("UPDATE", current, values);
      editTenant(current._id, current._id, values).then((data) => {
        setSubmitting(true);
        const onSuccess = () => history.go(0);
        submittedForm(updateSnackBarMessage, setSubmitting, data, onSuccess);
      });
    } else {
      newTenant(values).then((data) => {
        const onSuccess = () => {
          history.push(`/dashboard`);
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

  function cancel() {
    if (handleCancel) handleCancel();
    else {
      history.go(-1);
    }
  }
  const child = (values, namespace) => <></>;

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
