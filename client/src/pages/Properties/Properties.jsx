import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProperties } from "../../helpers/APICalls/properties";
import PropertyView from "./PropertyView";
import PgSideAndView from "../../components/PgSideAndView";
import PropertiesSideNav from "./PropertiesSideNav";

export default function Properties() {
  let { id } = useParams();
  const [currentPropertyId, setCurrentPropertyId] = useState(id);
  const [currentProperty, setCurrentProperty] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getProperties().then((res) => {
      console.log(res);
      setPropertiesData(res);
    });
  }, []);

  useEffect(() => {
    if (!id && propertiesData.length > 0) {
      setCurrentPropertyId(propertiesData[0]._id);
      setCurrentProperty(propertiesData[0]);
      history.replace(`/properties/${propertiesData[0]._id}`);
    } else if (id && propertiesData.length > 0) {
      setCurrentPropertyId(id);
      let curr = propertiesData.filter((p) => p._id.toString() === id)[0];
      setCurrentProperty(curr);
    } else if (id) {
      setCurrentPropertyId(id);
    }
  }, [history, propertiesData, currentPropertyId, id]);
  // api call here to get all properties
  //if no id param, set id to first on array from api call

  return (
    <PgSideAndView
      side={<PropertiesSideNav selectedId={id} data={propertiesData} />}
      view={
        <PropertyView
          propertyId={currentPropertyId}
          currentProperty={currentProperty}
        />
      }
    />
  );
}
