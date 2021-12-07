import TextField from "@mui/material/TextField";
import { useField } from "formik";

export default function FormikTextField({ label, formikKey, ...props }) {
  const [field, meta] = useField(formikKey);
  return (
    <TextField
      id={field.name}
      name={field.name}
      label={label}
      fullWidth
      variant="standard"
      autoFocus
      helperText={meta.touched ? meta.error : ""}
      error={meta.touched && Boolean(meta.error)}
      value={field.value}
      onChange={field.onChange}
      {...props}
    />
  );
}
