import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import UserHeader from "./UserHeader";
import { getUserForId } from "../../helpers/APICalls/user";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import currencyformatter from "../../helpers/currencyFormatter";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "../../helpers/dateFormatter";
import MaintenanceForm from "../../components/forms/MaintenanceForm";
import { useAuth } from "../../context/useAuthContext";
import UserFormExt from "../../components/forms/UserFormExt";
import CssBaseline from "@mui/material/CssBaseline";

export default function UserView({ userId }) {
  const { loggedInUser } = useAuth();
  const isAdd = userId === "add";

  const [maintenanceData, setMaintenanceData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [leaseData, setLeaseData] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(null);
    if (!isAdd && userId) {
      getUserForId(userId).then((res) => {
        setUserData(res);
        console.log(res);
        // setMaintenanceData(res.maintenances);
        // setInvoiceData(res.invoices);
        // setLeaseData(res.leases);
      });
    }
  }, [userId, isAdd]);

  const maintenanceColumns = [
    {
      label: "Date",
      content: (maintenance) => <span>{dateFormatter(maintenance.date)}</span>,
    },

    {
      label: "Issue",
      content: (maintenance) => <span>{maintenance.title}</span>,
    },
    {
      label: "Location",
      content: (maintenance) => (
        <span>
          {maintenance.location === "common" ? "common" : userData.unit.name}
        </span>
      ),
    },
    {
      label: "Status",
      content: (user) => <span>{user.status}</span>,
    },

    {
      label: "",
      content: (maintenance) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/maintenances/${maintenance._id}`}
        >
          <span>view</span>
        </Link>
      ),
    },
  ];

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
    {
      label: "",
      content: (invoice) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/invoices/${invoice._id}`}
        >
          <span>view</span>
        </Link>
      ),
    },
  ];

  const leaseColumns = [
    {
      label: "monthly rent",
      content: (lease) => (
        <span>{currencyformatter.format(lease.monthly_rent)}</span>
      ),
    },
    {
      label: "start date",
      content: (lease) => <span>{dateFormatter(lease.start_date)}</span>,
    },
    {
      label: "end date ",
      content: (lease) => <span>{dateFormatter(lease.end_date)}</span>,
    },
    {
      label: "",
      content: (lease) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/leases/${lease._id}`}
        >
          <span>view</span>
        </Link>
      ),
    },
  ];

  if (isAdd) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserFormExt />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <CssBaseline />

      <LoadingView
        data={userData}
        loadingState={(data) => !data}
        notFoundState={(data) => data.message}
      >
        {userData && (
          <Grid container spacing={3}>
            <UserHeader currentUser={userData} />
            {/* 
            <Grid item xs={12}>
              <SingleTableView
                label={"Maintenance"}
                data={maintenanceData}
                columns={maintenanceColumns}
                toggleLabel="add"
                toggleContent={<MaintenanceForm />}
              />
            </Grid>
            <Grid item xs={12}>
              <SingleTableView
                label={"Invoices"}
                data={invoiceData}
                columns={invoiceColumns}
              />
            </Grid>
            <Grid item xs={12}>
              <SingleTableView
                label={"Leases"}
                data={leaseData}
                columns={leaseColumns}
              />
            </Grid> */}
          </Grid>
        )}
      </LoadingView>
    </>
  );
}
