import React from "react";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import FormikTextField from "./FormikTextField";
import FormikImage from "./FormikImage";
import { DefaultUserImage } from "../../images/images";

export const userInitialValues = {
  first_name: "",
  last_name: "",
  image_url: "",
  phone_number: "",
  email: "",
  password: "",
};

export const userValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("Property Name is required")
    .max(40, "Property Name is too long"),
  last_name: Yup.string().required("last_name is required"),
  image_url: Yup.mixed(),
  phone_number: Yup.string().required("phone_number is required"),
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is required"),
});

export default function UserFormSub({ namespace }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormikImage
          label="image"
          formikKey="image_url"
          defaultImage={DefaultUserImage}
          avatar
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormikTextField
          label="First Name"
          formikKey={namespace + ".first_name"}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormikTextField
          label="Last Name"
          formikKey={namespace + ".last_name"}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormikTextField
          label="Phone Number"
          formikKey={namespace + ".phone_number"}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormikTextField label="Email" formikKey={namespace + ".email"} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormikTextField label="Password" formikKey={namespace + ".password"} />
      </Grid>
    </Grid>
  );
}
