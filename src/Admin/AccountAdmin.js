import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import MyAccount from "../Components/MyAccount";

const HomeAdmin = () => {
  const navigate = useNavigate();
  const [userlog, setUserlog] = useState(localStorage.getItem("Logkey"));

  useEffect(() => {
    if (userlog === undefined || userlog === null) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* <Header />
      <Sidebar /> */}
      <MyAccount />
    </>
  );
};

export default HomeAdmin;
