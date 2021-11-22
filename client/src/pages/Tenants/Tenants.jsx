import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getTenants } from "../../helpers/APICalls/tenants";
import TenantView from "./TenantView";
import PgSideAndView from "../../components/PgSideAndView";
import TenantSideNav from "./TenantsSideNav";

export default function Tenants() {
  let { id } = useParams();
  const [currentTenantId, setCurrentTenantId] = useState(id);
  const [currentTenant, setCurrentTenant] = useState([]);

  const [tenantData, setTenantData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getTenants().then((res) => {
      setTenantData(res);
    });
  }, []);

  useEffect(() => {
    if (!id && tenantData.length > 0) {
      setCurrentTenantId(tenantData[0].id);
      setCurrentTenant(tenantData[0]);
      history.replace(`/tenants/${tenantData[0].id}`);
    } else if (id && tenantData.length > 0) {
      setCurrentTenantId(id);
      let curr = tenantData.filter((p) => p.id.toString() === id)[0];
      setCurrentTenant(curr);
    } else if (id) {
      setCurrentTenantId(id);
    }
  }, [history, tenantData, currentTenantId, id]);

  return (
    <PgSideAndView
      side={<TenantSideNav selectedId={id} data={tenantData} />}
      view={
        <TenantView tenantId={currentTenantId} currentTenant={currentTenant} />
      }
    />
  );
}
