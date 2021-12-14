import React from "react";
import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import { useField, FieldArray } from "formik";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

export default function FormikMultiImage({ label, formikKey, ...props }) {
  const [field, meta, helpers] = useField(formikKey);

  return (
    <Grid>
      <InputLabel
        sx={{ mb: 1 }}
        htmlFor={field.name}
        error={meta.touched && Boolean(meta.error)}
      >
        {label}
      </InputLabel>
      <Grid container spacing={2}>
        <FieldArray
          id={field.name}
          name={field.name}
          render={(arrayHelpers) => (
            <React.Fragment>
              {field.value.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={URL.createObjectURL(item)}
                      alt={label}
                    />

                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </React.Fragment>
          )}
        />
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ height: "100%", minHeight: 200 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <CardActions>
                <Button component="label">
                  Upload images
                  <Input
                    sx={{ display: "none" }}
                    type="file"
                    inputProps={{
                      accept: "image/*",
                      multiple: true,
                    }}
                    label="mew"
                    id={field.name}
                    onChange={(e) => helpers.setValue([...e.target.files])}
                  />
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <TextField
        fullWidth
        variant="standard"
        helperText={meta.touched ? meta.error : ""}
        error={meta.touched && Boolean(meta.error)}
        value={field.value}
        disabled
        sx={{
          ".MuiInput-root::before": {
            borderBottom: "none",
          },
          ".MuiInput-root::after": {
            borderBottom: "none",
          },
        }}
      />
    </Grid>
  );
}
