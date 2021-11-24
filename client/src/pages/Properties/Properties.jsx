import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProperties } from "../../helpers/APICalls/property";
import PropertyView from "./PropertyView";
import PgSideAndView from "../../components/PgSideAndView";
import PropertiesSideNav from "./PropertiesSideNav";

export default function Properties() {
  let { id } = useParams();
  const [currentPropertyId, setCurrentPropertyId] = useState();
  const [propertiesData, setPropertiesData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getProperties().then((res) => {
      setPropertiesData(res);
    });
  }, []);

  useEffect(() => {
    if (!id && propertiesData.length > 0) {
      setCurrentPropertyId(propertiesData[0]._id);
      history.replace(`/properties/${propertiesData[0]._id}`);
    } else if (id && propertiesData.length > 0) {
      setCurrentPropertyId(id);
    }
  }, [history, propertiesData, currentPropertyId, id]);

  return (
    <PgSideAndView
      side={<PropertiesSideNav selectedId={id} data={propertiesData} />}
      view={<PropertyView propertyId={currentPropertyId} />}
    />
  );
}
