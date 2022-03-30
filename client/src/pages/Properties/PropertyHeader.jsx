import React, { useState } from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import moment from "moment";
import PropertyItem from "../../components/PropertyItem";
import currencyformatter from "../../helpers/currencyFormatter";
import PropertyForm from "./../../components/forms/PropertyForm";
import Paper from "@mui/material/Paper";

export default function Header({ currentProperty, invoiceData }) {
  const [editMode, setEditMode] = useState(false);
  function toggleEdit() {
    setEditMode(!editMode);
  }

  const currYear = moment().year();
  const currMonth = moment().month();

  const currInvoices = invoiceData.filter((invoice) => {
    let year = moment(invoice.due_date).year();
    let month = moment(invoice.due_date).month();
    return currYear === year && currMonth === month;
  });

  const totalCurrInvoces = currInvoices.reduce(
    (acc, curr) => (acc += Number(curr.amount)),
    0
  );
  const paidCurrInvoces = currInvoices.reduce((acc, curr) => {
    if (curr.paid_date) return (acc += Number(curr.amount));
    return acc;
  }, 0);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        {!editMode && (
          <Grid item container spacing={3}>
            {Object.keys(currentProperty).length > 0 && (
              <PropertyItem property={currentProperty} />
            )}

            <Grid item>
              <Typography variant="body1" color="primary">
                Total Monthy Rent
              </Typography>
              <Typography variant="body2" color="text.primary">
                {`${currencyformatter.format(
                  paidCurrInvoces
                )}/${currencyformatter.format(totalCurrInvoces)}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="primary">
                Total Cost
              </Typography>
              <Typography variant="body2" color="text.primary">
                {`${currencyformatter.format(currentProperty.cost)}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="primary">
                Total Revene
              </Typography>
              <Typography variant="body2" color="text.primary">
                {`${currencyformatter.format(
                  paidCurrInvoces - currentProperty.cost
                )}`}
              </Typography>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid container justifyContent="flex-end">
                <Button variant="outlined" onClick={toggleEdit}>
                  edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        {editMode && (
          <PropertyForm
            currentProperty={currentProperty}
            handleCancel={toggleEdit}
          />
        )}
      </Paper>
    </Grid>
  );
}
