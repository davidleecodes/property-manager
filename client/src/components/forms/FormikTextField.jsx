import TextField from "@mui/material/TextField";
import { useField } from "formik";
import CssBaseline from "@mui/material/CssBaseline";

export default function FormikTextField({ label, formikKey, ...props }) {
  const [field, meta] = useField(formikKey);
  return (
    <>
      <CssBaseline />

      <TextField
        id={field.name}
        name={field.name}
        label={label}
        fullWidth
        variant="standard"
        helperText={meta.touched ? meta.error : ""}
        error={meta.touched && Boolean(meta.error)}
        value={field.value}
        onChange={field.onChange}
        {...props}
      />
    </>
  );
}
