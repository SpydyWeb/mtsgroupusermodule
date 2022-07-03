import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeAdmin from "../../Admin/HomeAdmin";
import ResetPassword from "../../Admin/ResetPassword";
import RoleMaster from "../../Admin/RoleMaster";
import RoleDefination from "../../Admin/RoleDefination";
import UserModule from "../../Admin/UserModule";
import AccessRole from "../../Admin/AccessRole";
import SubAccessRoles from "../../Admin/SubAccessRoles";
import AllRolesDetails from "../../Admin/AllRolesDetails";
import ViewAccessRole from "../../Admin/ViewAccessRole";
import AllUser from "../../Admin/AllUser";
import App from "../../App";
import StepperForm from "../Vendor/StepperForm";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} exact />
      <Route path="/admin" element={<HomeAdmin />} exact />
      <Route path="/admin/reset" element={<ResetPassword />} exact />
      <Route path="/admin/rolemaster" element={<RoleMaster />} exact />
      <Route path="/admin/rolemaster/:name" element={<RoleMaster />} exact />
      <Route path="/admin/roleDefination" element={<RoleDefination />} exact />
      <Route
        path="/admin/roleDefination/:name"
        element={<RoleDefination />}
        exact
      />
      <Route path="/admin/userModule" element={<UserModule />} exact />
      <Route path="/admin/accessrole" element={<AccessRole />} exact />
      <Route path="/admin/subaccessrole" element={<SubAccessRoles />} exact />
      <Route path="/admin/getallrole" element={<AllRolesDetails />} exact />
      <Route path="/admin/viewaccessrole" element={<ViewAccessRole />} exact />
      <Route path="/admin/getalluser" element={<AllUser />} exact />
      <Route path="/vendorprofile" element={<StepperForm />} exact />
    </Routes>
  );
};

export default Routing;
