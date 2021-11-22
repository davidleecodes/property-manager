import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableView from "./TableView";

export default function TabTableView({ label, tabs, columns, sortParams }) {
  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Typography component="h2" variant="h6" color="primary">
                {label}
              </Typography>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {tabs.map((tab, idx) => (
                  <Tab
                    key={tab.label + idx}
                    label={tab.label}
                    value={idx.toString()}
                  />
                ))}
              </TabList>
            </Box>
            {tabs.map((tab, idx) => (
              <TabPanel key={tab.label + idx + "panel"} value={idx.toString()}>
                <TableView
                  data={tab.content}
                  columns={columns}
                  sortParams={sortParams}
                ></TableView>
              </TabPanel>
            ))}
          </TabContext>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
