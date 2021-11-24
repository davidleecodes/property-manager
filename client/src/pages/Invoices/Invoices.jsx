import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getInvoices } from "../../helpers/APICalls/invoice";
import InvoiceView from "./InvoiceView";
import PgSideAndView from "../../components/PgSideAndView";
import InvoicesSideNav from "./InvoicesSideNav";

export default function Invoices() {
  let { id } = useParams();
  const [currentInvoiceId, setCurrentInvoiceId] = useState(id);

  const [invoiceData, setInvoiceData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getInvoices().then((res) => {
      setInvoiceData(res);
    });
  }, []);

  useEffect(() => {
    if (!id && invoiceData.length > 0) {
      setCurrentInvoiceId(invoiceData[0]._id);
      history.replace(`/invoices/${invoiceData[0]._id}`);
    } else if (id && invoiceData.length > 0) {
      setCurrentInvoiceId(id);
    }
  }, [history, invoiceData, setCurrentInvoiceId, id]);

  return (
    <PgSideAndView
      side={<InvoicesSideNav selectedId={id} data={invoiceData} />}
      view={<InvoiceView invoiceId={currentInvoiceId} />}
    />
  );
}
