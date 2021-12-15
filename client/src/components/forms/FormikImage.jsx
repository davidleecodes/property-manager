import React from "react";
import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import { useField } from "formik";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
export default function FormikImage({
  label,
  formikKey,
  defaultImage,
  avatar,
  ...props
}) {
  const [field, meta, helpers] = useField(formikKey);
  function handleImageError(e) {
    e.target.src = defaultImage;
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {!avatar && (
        <Grid item>
          <img
            src={
              field.value instanceof File
                ? URL.createObjectURL(field.value)
                : field.value
                ? field.value
                : defaultImage
            }
            style={{
              width: "300px",
              height: "180px",
              objectFit: "cover",
            }}
            alt={label}
            onError={handleImageError}
          />
        </Grid>
      )}
      {avatar && (
        <Grid item>
          <Avatar
            src={
              field.value instanceof File
                ? URL.createObjectURL(field.value)
                : field.value
                ? field.value
                : defaultImage
            }
            sx={{ width: 200, height: 200 }}
          />
        </Grid>
      )}
      <Grid item>
        <Button component="label">
          change
          <Input
            sx={{ display: "none" }}
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            id={field.name}
            onChange={(e) => helpers.setValue(e.target.files[0])}
          />
        </Button>
        <Button onClick={() => helpers.setValue("")}> remove</Button>
      </Grid>
    </Grid>
  );
}
