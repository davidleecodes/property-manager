import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getLeases } from "../../helpers/APICalls/leases";
import LeaseView from "./LeaseView";
import PgSideAndView from "../../components/PgSideAndView";
import LeasesSideNav from "./LeasesSideNav";

export default function Leases() {
  let { id } = useParams();
  const [currentLeaseId, setCurrentLeaseId] = useState(id);
  const [currentLease, setCurrentLease] = useState([]);

  const [leaseData, setLeaseData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getLeases().then((res) => {
      setLeaseData(res);
    });
  }, []);

  useEffect(() => {
    if (!id && leaseData.length > 0) {
      setCurrentLeaseId(leaseData[0].id);
      setCurrentLease(leaseData[0]);
      history.replace(`/leases/${leaseData[0].id}`);
    } else if (id && leaseData.length > 0) {
      setCurrentLeaseId(id);
      let curr = leaseData.filter((p) => p.id.toString() === id)[0];
      setCurrentLease(curr);
    } else if (id) {
      setCurrentLeaseId(id);
    }
  }, [history, leaseData, setCurrentLeaseId, id]);

  return (
    <PgSideAndView
      side={<LeasesSideNav selectedId={id} data={leaseData} />}
      view={<LeaseView leaseId={currentLeaseId} currentLease={currentLease} />}
    />
  );
}
