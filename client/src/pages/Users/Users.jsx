import React, { useState, useEffect } from "react";
import { getUsers } from "../../helpers/APICalls/user";
import { useParams, useHistory } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import PgSideAndView from "../../components/PgSideAndView";
import UserView from "./UserView";
import UserSideNav from "./UsersSideNav";

export default function Users() {
  let { id } = useParams();
  const [currentUserId, setCurrentUserId] = useState();

  const [userData, setUserData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getUsers().then((res) => {
      setUserData(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    if (!id && userData.length > 0) {
      setCurrentUserId(userData[0]._id);
      history.replace(`/users/${userData[0]._id}`);
    } else if (id && userData.length > 0) {
      setCurrentUserId(id);
    }
  }, [history, userData, setCurrentUserId, id]);

  return (
    <>
      <CssBaseline />

      <PgSideAndView
        side={<UserSideNav selectedId={id} data={userData} />}
        view={<UserView userId={currentUserId} />}
      />
    </>
  );
}
