import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getInvoices } from "../../helpers/APICalls/invoices";
import InvoiceView from "./InvoiceView";
import PgSideAndView from "../../components/PgSideAndView";
import InvoicesSideNav from "./InvoicesSideNav";

export default function Invoices() {
  let { id } = useParams();
  const [currentInvoiceId, setCurrentInvoiceId] = useState(id);
  const [currentInvoice, setCurrentInvoice] = useState([]);

  const [invoiceData, setInvoiceData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getInvoices().then((res) => {
      setInvoiceData(res);
    });
  }, []);

  useEffect(() => {
    if (!id && invoiceData.length > 0) {
      setCurrentInvoiceId(invoiceData[0].id);
      setCurrentInvoice(invoiceData[0]);
      history.replace(`/invoices/${invoiceData[0].id}`);
    } else if (id && invoiceData.length > 0) {
      setCurrentInvoiceId(id);
      let curr = invoiceData.filter((p) => p.id.toString() === id)[0];
      setCurrentInvoice(curr);
    } else if (id) {
      setCurrentInvoiceId(id);
    }
  }, [history, invoiceData, setCurrentInvoiceId, id]);

  return (
    <PgSideAndView
      side={<InvoicesSideNav selectedId={id} data={invoiceData} />}
      view={
        <InvoiceView
          invoiceId={currentInvoiceId}
          currentInvoice={currentInvoice}
        />
      }
    />
  );
}
