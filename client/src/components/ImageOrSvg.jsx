import React from "react";
import { Box } from "@mui/system";

import Avatar from "@mui/material/Avatar";
import { theme } from "./../themes/theme";
import { Grid } from "@mui/material";

export default function ImageOrSvg({ Image, width, height, ...props }) {
  // eslint-disable-next-line valid-typeof
  if (typeof Image === "string") {
    return (
      <Avatar
        sx={{
          width: { width },
          height: { height },
        }}
        src={Image}
      />
    );
  } else {
    console.log(typeof image);
    return (
      <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          sx={{
            borderRadius: "50%",
            width: { width },
            height: { height },
            backgroundColor: theme.palette.primary.light,
          }}
        >
          <Grid item>
            {
              <Image
                width={width * 1.1}
                height={height * 1.1}
                fill={theme.palette.primary.contrastText}
              />
            }
          </Grid>
        </Grid>
      </>
    );
  }
}
