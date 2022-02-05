import React, { useState, useEffect } from "react";
import { getLeaseForId } from "../../helpers/APICalls/lease";
import { Grid } from "@mui/material";
import LeaseHeader from "./LeaseHeader";
import currencyformatter from "../../helpers/currencyFormatter";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "./../../helpers/dateFormatter";
import LeaseForm from "../../components/forms/LeaseForm";

export default function LeaseView({ leaseId }) {
  const [leaseData, setLeaseData] = useState();
  const isAdd = leaseId === "add";

  useEffect(() => {
    setLeaseData(null);
    if (!isAdd && leaseId) {
      getLeaseForId(leaseId).then((res) => {
        setLeaseData(res);
      });
    }
  }, [leaseId, isAdd]);
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
      label: "end date",
      content: (lease) => <span>{dateFormatter(lease.end_date)}</span>,
    },
  ];

  if (isAdd) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LeaseForm />
        </Grid>
      </Grid>
    );
  }

  return (
    <LoadingView
      data={leaseData}
      loadingState={(data) => !data}
      notFoundState={(data) => data.message}
    >
      {leaseData && (
        <Grid container spacing={3}>
          <LeaseHeader currentLease={leaseData} />
          <Grid item xs={12}>
            <SingleTableView
              label={"Lease"}
              data={[leaseData]}
              columns={leaseColumns}
              toggleLabel="edit"
              toggleContent={<LeaseForm current={leaseData} />}
            />
          </Grid>
        </Grid>
      )}
    </LoadingView>
  );
}
