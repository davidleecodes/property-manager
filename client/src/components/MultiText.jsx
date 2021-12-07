import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useField, FieldArray } from "formik";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
export default function MultiText({ label, formikKey, ...props }) {
  const [field, meta, helpers] = useField(formikKey);
  const [textData, setTextData] = useState("");

  function handleAddText() {
    helpers.setValue([...field.value, ...textData.split(",")]);
    setTextData("");
  }

  function handleSort() {
    let arr = field.value.map((item) => {
      let regex = new RegExp("([0-9]+)|([a-zA-Z]+)", "g");
      return item.match(regex);
    });

    arr.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });

    arr = arr.map((item) => item.join(""));
    helpers.setValue(arr);
  }

  return (
    <Grid>
      <InputLabel htmlFor={field.name}>{label}</InputLabel>
      <FieldArray
        id={field.name}
        name={field.name}
        render={(arrayHelpers) => (
          // <Paper sx={{ p: 2 }}>
          <Grid>
            {field.value.map((item, index) => (
              <Chip
                size="small"
                key={index}
                label={item}
                variant="outlined"
                onDelete={() => arrayHelpers.remove(index)}
              />
            ))}
            {/* <Grid container justifyContent="flex-end"> */}
            <Button component="label" onClick={handleSort}>
              sort
            </Button>
            {/* </Grid> */}
          </Grid>
          // </Paper>
        )}
      />
      <TextField
        id={field.name}
        name={field.name}
        // label={label}
        fullWidth
        multiline
        rows={4}
        variant="standard"
        autoFocus
        helperText={
          meta.touched && meta.error
            ? meta.error
            : "add units(add multiple separated by a comma)"
        }
        error={meta.touched && Boolean(meta.error)}
        onChange={(e) => setTextData(e.target.value)}
        value={textData}
      />
      <Grid container justifyContent="flex-end">
        <Button component="label" onClick={handleAddText}>
          add
        </Button>
      </Grid>
    </Grid>
  );
}
