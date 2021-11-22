import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { theme } from "./../themes/theme";
import { alpha } from "@mui/material";

const tableCellStyle = {
  display: { xs: "block", md: "table-cell" },
  "& span": {
    xs: { float: "right" },
    md: { float: "left" },
  },
  borderBottom: {
    xs: "none",
    md: "1px solid rgba(224, 224, 224, 1)",
  },
};
const before = {
  "&::before": {
    xs: { content: "attr(data-th)" },
    md: { content: '""' },
  },
};
export default function TableView({ data, columns, sortParams }) {
  const [selectedSort, setSelectedSort] = useState();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (sortParams) setSelectedSort(sortParams[0]);
  }, [sortParams]);

  useEffect(() => {
    let sorted = [...data];
    if (selectedSort) {
      const [sortTerm1, sortTerm2] = selectedSort.terms;

      sorted = sorted.sort((a, b) => {
        const propA = sortTerm1(a).toString().toLowerCase();
        const propB = sortTerm1(b).toString().toLowerCase();

        if (propA === propB) {
          if (sortTerm2) {
            const prop2A = sortTerm2(a).toString().toLowerCase();
            const prop2B = sortTerm2(b).toString().toLowerCase();
            if (prop2A === prop2B) return 0;
            return prop2A > prop2B ? 1 : -1;
          }
          return 0;
        }
        return propA > propB ? 1 : -1;
      });
    }
    setSortedData(sorted);
  }, [data, selectedSort]);

  const handleSort = (param) => {
    setSelectedSort(param);
  };

  return (
    <React.Fragment>
      {sortParams && selectedSort && (
        <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
          {sortParams.map((param) => (
            <Button
              key={param.label}
              onClick={() => handleSort(param)}
              variant="outlined"
              size="small"
              sx={
                selectedSort.label === param.label
                  ? {
                      mr: 0.2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  : { mr: 0.2 }
              }
            >
              {param.label}
            </Button>
          ))}
        </Grid>
      )}
      <Table size="small">
        <TableHead sx={{ display: { xs: "none", md: "table-header-group" } }}>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.label}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((item, idx) => (
            <TableRow
              key={item.id || idx}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              {columns.map((col, idx) => (
                <TableCell
                  key={col.label + item.id}
                  data-th={col.label}
                  sx={
                    col.hideLabel
                      ? tableCellStyle
                      : { ...tableCellStyle, ...before }
                  }
                >
                  {col.content(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
