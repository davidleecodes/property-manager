import React, { useState, useEffect } from "react";
import { getInvoiceForId } from "../../helpers/APICalls/invoice";
import { Grid } from "@mui/material";
import InvoiceHeader from "./InvoiceHeader";
import currencyformatter from "../../helpers/currencyFormatter";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "./../../helpers/dateFormatter";

export default function InvoiceView({ invoiceId }) {
  const [invoiceData, setInvoiceData] = useState();
  useEffect(() => {
    if (invoiceId) {
      getInvoiceForId(invoiceId).then((res) => {
        setInvoiceData(res);
      });
    }
  }, [invoiceId]);
  const invoiceColumns = [
    {
      label: "amount",
      content: (invoice) => (
        <span>{currencyformatter.format(invoice.amount)}</span>
      ),
    },
    {
      label: "due date",
      content: (invoice) => <span>{dateFormatter(invoice.due_date)}</span>,
    },
    {
      label: "paid date ",
      content: (invoice) => <span>{dateFormatter(invoice.paid_date)}</span>,
    },
  ];
  return (
    <LoadingView
      data={invoiceData}
      loadingState={(data) => !data}
      notFoundState={(data) => data.message}
    >
      {invoiceData && (
        <Grid container spacing={3}>
          <InvoiceHeader currentInvoice={invoiceData} />
          <Grid item xs={12}>
            <SingleTableView
              label={"Invoice"}
              data={[invoiceData]}
              columns={invoiceColumns}
            />
          </Grid>
        </Grid>
      )}
    </LoadingView>
  );
}
