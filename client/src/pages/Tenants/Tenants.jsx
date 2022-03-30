import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getTenants } from "../../helpers/APICalls/tenant";
import TenantView from "./TenantView";
import PgSideAndView from "../../components/PgSideAndView";
import TenantSideNav from "./TenantsSideNav";
import CssBaseline from "@mui/material/CssBaseline";

export default function Tenants() {
  let { id } = useParams();
  const [currentTenantId, setCurrentTenantId] = useState();

  const [tenantData, setTenantData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getTenants().then((res) => {
      setTenantData(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    if (!id && tenantData.length > 0) {
      setCurrentTenantId(tenantData[0]._id);
      history.replace(`/tenants/${tenantData[0]._id}`);
    } else if (id && tenantData.length > 0) {
      setCurrentTenantId(id);
    }
  }, [history, tenantData, setCurrentTenantId, id]);

  return (
    <>
      <CssBaseline />

      <PgSideAndView
        side={<TenantSideNav selectedId={id} data={tenantData} />}
        view={<TenantView tenantId={currentTenantId} />}
      />
    </>
  );
}
