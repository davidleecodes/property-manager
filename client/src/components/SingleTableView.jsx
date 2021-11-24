import TableView from "./TableView";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function SingleTableView({ label, data, columns, children }) {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography component="h2" variant="h6" color="primary">
        {label}
      </Typography>
      <TableView data={data} columns={columns}></TableView>
      {children}
    </Paper>
  );
}
