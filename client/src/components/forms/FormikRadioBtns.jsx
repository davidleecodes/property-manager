import TextField from "@mui/material/TextField";
import { useField } from "formik";
import CssBaseline from "@mui/material/CssBaseline";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";

export default function FormikCheckBox({
  label,
  formikKey,
  options,
  ...props
}) {
  const [field, meta] = useField(formikKey);
  return (
    <>
      <CssBaseline />

      <FormControl
        component="fieldset"
        error={meta.touched && Boolean(meta.error)}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          row
          aria-label={label}
          id={field.name}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
        >
          {Object.entries(options).map(([key, value]) => (
            <FormControlLabel value={value} control={<Radio />} label={key} />
          ))}
        </RadioGroup>
        <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
      </FormControl>
    </>
  );
}
