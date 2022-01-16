import React, { useState } from "react";
import TableView from "./TableView";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

export default function SingleTableView({
  label,
  data,
  columns,
  toggleLabel,
  toggleContent,
  children,
}) {
  const [isToggleMode, setIsToggleMode] = useState(false);
  function toggleMode() {
    setIsToggleMode(!isToggleMode);
  }
  return (
    <React.Fragment>
      {!isToggleMode && (
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Grid container>
            <Typography component="h2" variant="h6" color="primary">
              {label}
            </Typography>

            {toggleLabel && (
              <Grid item sx={{ flexGrow: 1 }}>
                <Grid container justifyContent="flex-end">
                  <Button variant="outlined" onClick={toggleMode}>
                    {toggleLabel}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>

          <TableView data={data} columns={columns}></TableView>
          {children}
        </Paper>
      )}
      {isToggleMode &&
        React.cloneElement(toggleContent, { handleCancel: toggleMode })}
    </React.Fragment>
  );
}
