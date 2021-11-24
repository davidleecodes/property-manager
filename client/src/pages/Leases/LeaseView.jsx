import React, { useState, useEffect } from "react";
import { getLeaseForId } from "../../helpers/APICalls/lease";
import { Grid } from "@mui/material";
import LeaseHeader from "./LeaseHeader";
import currencyformatter from "../../helpers/currencyFormatter";
import LoadingView from "../../components/LoadingView";
import SingleTableView from "../../components/SingleTableView";
import dateFormatter from "./../../helpers/dateFormatter";

export default function LeaseView({ leaseId }) {
  const [leaseData, setLeaseData] = useState();
  useEffect(() => {
    if (leaseId) {
      getLeaseForId(leaseId).then((res) => {
        setLeaseData(res);
      });
    }
  }, [leaseId]);
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
            />
          </Grid>
        </Grid>
      )}
    </LoadingView>
  );
}
