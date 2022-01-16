export const submittedForm = (
  updateSnackBarMessage,
  setSubmitting,
  data,
  onSuccess
) => {
  setSubmitting(true);
  if (data.error) {
    setSubmitting(false);
    updateSnackBarMessage(data.error.message);
  } else if (data.success) {
    console.log("SUCCESS", data.success);
    onSuccess(data);
    setSubmitting(false);
  } else {
    // should not get here from backend but this catch is for an unknown issue
    setSubmitting(false);
    updateSnackBarMessage("An unexpected error occurred. Please try again");
  }
};
