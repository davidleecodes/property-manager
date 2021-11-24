import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMaintenances } from "../../helpers/APICalls/maintenance";
import MaintenanceView from "./MaintenanceView";
import PgSideAndView from "../../components/PgSideAndView";
import MaintenanceSideNav from "./MaintenancesSideNav";

export default function Maintance() {
  let { id } = useParams();
  const [currentMaintenanceId, setCurrentMaintenanceId] = useState(id);

  const [maintenanceData, setMaintenanceData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getMaintenances().then((res) => {
      setMaintenanceData(res);
    });
  }, []);

  useEffect(() => {
    if (!id && maintenanceData.length > 0) {
      setCurrentMaintenanceId(maintenanceData[0]._id);
      history.replace(`/maintenances/${maintenanceData[0]._id}`);
    } else if (id && maintenanceData.length > 0) {
      setCurrentMaintenanceId(id);
    }
  }, [history, maintenanceData, setCurrentMaintenanceId, id]);

  return (
    <PgSideAndView
      side={<MaintenanceSideNav selectedId={id} data={maintenanceData} />}
      view={<MaintenanceView maintenanceId={currentMaintenanceId} />}
    />
  );
}
