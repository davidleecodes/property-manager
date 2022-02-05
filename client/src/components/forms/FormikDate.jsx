import TextField from "@mui/material/TextField";
import { useField } from "formik";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function FormikDate({ label, formikKey, ...props }) {
  const [field, meta, helpers] = useField(formikKey);
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        id={field.name}
        name={field.name}
        label={label}
        value={field.value}
        onChange={(e) => helpers.setValue(e)}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
          />
        )}
      />
    </LocalizationProvider>
  );
}
