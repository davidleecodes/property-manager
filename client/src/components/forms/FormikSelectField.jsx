import { useField } from "formik";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function FormikSelectField({
  label,
  formikKey,
  itemArray,
  itemValue,
  itemLabel,
  ...props
}) {
  const [field, meta] = useField(formikKey);

  return (
    <TextField
      select
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
    >
      {itemArray.map((item) => (
        <MenuItem value={itemValue(item)} key={itemValue(item)}>
          {(itemValue, itemLabel(item))}
        </MenuItem>
      ))}
    </TextField>
  );
}
