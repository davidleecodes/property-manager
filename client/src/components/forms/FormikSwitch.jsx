import TextField from "@mui/material/TextField";
import { useField } from "formik";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
export default function FormikSwitch({ label, formikKey, ...props }) {
  const [field, meta] = useField(formikKey);
  return (
    <>
      <CssBaseline />
      <FormControl
        error={meta.touched && Boolean(meta.error)}
        component="fieldset"
      >
        <FormControlLabel
          label={label}
          control={
            <Switch
              id={field.name}
              name={field.name}
              checked={field.value}
              onChange={field.onChange}
            />
          }
        />
        <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
      </FormControl>
      {/* <TextField
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
      /> */}
    </>
  );
}
