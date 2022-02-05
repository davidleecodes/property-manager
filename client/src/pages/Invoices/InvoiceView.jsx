import React, { useState, useEffect } from "react";
import { getInvoiceForId } from "../../helpers/APICalls/invoice";
import { Grid } from "@mui/material";
import InvoiceHeader from "./InvoiceHeader";
import currencyformatter from "../../helpers/currencyFormatter";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "./../../helpers/dateFormatter";
import InvoiceForm from "../../components/forms/InvoiceForm";

export default function InvoiceView({ invoiceId }) {
  const [invoiceData, setInvoiceData] = useState();
  const isAdd = invoiceId === "add";

  useEffect(() => {
    setInvoiceData(null);

    if (!isAdd && invoiceId) {
      getInvoiceForId(invoiceId).then((res) => {
        setInvoiceData(res);
      });
    }
  }, [invoiceId, isAdd]);
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

  if (isAdd) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InvoiceForm />
        </Grid>
      </Grid>
    );
  }

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
              toggleLabel="edit"
              toggleContent={<InvoiceForm current={invoiceData} />}
            />
          </Grid>
        </Grid>
      )}
    </LoadingView>
  );
}
