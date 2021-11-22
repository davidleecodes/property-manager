import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import { theme } from "./../themes/theme";
import { alpha } from "@mui/material";
const linkStyle = {
  "&.selected": {
    color: theme.palette.primary.main,
  },
};

function Panel({
  handleChange,
  selectedId,
  data,
  path,
  itemContent,
  onSort,
  onSearch,
  onClear,
  sortParams,
  selectedSort,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) onSearch(value);
    else onClear();
  };

  const handleClear = (e) => {
    setSearchTerm("");
    onClear();
  };
  return (
    <React.Fragment>
      <TextField
        label="search"
        sx={{ width: "100%" }}
        onChange={(e) => handleSearch(e)}
        value={searchTerm}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) => handleClear(e)}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        {sortParams.map((param) => (
          <Button
            key={param.label}
            onClick={() => onSort(param)}
            // disabled={selectedSort === param.label}
            variant="outlined"
            size="small"
            sx={
              selectedSort === param.label
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

      <List>
        {data.length > 0 &&
          data.map((item) => (
            <React.Fragment key={item._id}>
              <ListItemButton
                alignItems="center"
                onClick={handleChange("panel1")}
                component={RouterLink}
                to={`/${path}/${item._id}`}
                activeClassName="selected"
                sx={linkStyle}
                selected={selectedId === item._id.toString()}
              >
                {itemContent(item)}
              </ListItemButton>
              <Divider component="li" />
            </React.Fragment>
          ))}
      </List>
    </React.Fragment>
  );
}

export default function SideNav({
  selectedId,
  data,
  path,
  itemContent,
  sortParams,
  searchParms,
  collapsedText,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [sortTerm, setSortTerm] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [selectedSort, setSelectedSort] = useState();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  let currentSelection = data.filter((p) => p._id.toString() === selectedId)[0];
  useEffect(() => {
    setSelectedSort(sortParams[0].label);
    setSortTerm(sortParams[0].terms);
  }, [data, sortParams]);

  useEffect(() => {
    let filtered = [...data];
    if (searchTerm) {
      filtered = data.filter((item) =>
        searchParms(item).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    let sorted = filtered;
    if (sortTerm) {
      const [sortTerm1, sortTerm2] = sortTerm;

      sorted = filtered.sort((a, b) => {
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
  }, [data, sortTerm, searchTerm, searchParms]);

  const handleSort = (param) => {
    setSortTerm(param.terms);
    setSelectedSort(param.label);
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "66%", flexShrink: 0 }}>
              {currentSelection && collapsedText.primary(currentSelection)}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {currentSelection && collapsedText.secondary(currentSelection)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Panel
              handleChange={handleChange}
              selectedId={selectedId}
              data={sortedData}
              path={path}
              itemContent={itemContent}
              onSort={handleSort}
              onSearch={handleSearch}
              onClear={handleClearSearch}
              sortParams={sortParams}
              selectedSort={selectedSort}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Panel
          handleChange={() => {}}
          selectedId={selectedId}
          data={sortedData}
          path={path}
          itemContent={itemContent}
          onSort={handleSort}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          sortParams={sortParams}
          selectedSort={selectedSort}
        />
      </Box>
    </React.Fragment>
  );
}
