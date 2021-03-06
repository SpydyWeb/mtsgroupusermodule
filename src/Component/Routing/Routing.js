import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

import LicenceType from "../../Admin/LicenceType";
import LicenceTable from "../../Admin/LicenceTable";
import CommunicationProduct from "../../Admin/CommunicationProduct";
import Communication from "../../Admin/Communication";
import State from "../../Admin/State";
import CommunicationProductTable from "../../Admin/CommunicationProductTable";
import CommunicationTable from "../../Admin/CommunicationTable";
import StateTable from "../../Admin/StateTable";
import AddVendorProduct from "../Vendor/VendorProduct/AddVendorProduct";
import ViewVendorProduct from "../Vendor/VendorProduct/ViewVendorProduct";

import Header from "../../Admin/Header";
import Sidebar from "../../Admin/Sidebar";
import ViewTabs from "../../Component/Vendor/ViewTabs";
const Routing = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <>
        <Routes>
          <Route path="/" element={<App />} exact />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/admin" element={<HomeAdmin />} exact />
          <Route path="/admin/reset" element={<ResetPassword />} exact />
          <Route path="/admin/rolemaster" element={<RoleMaster />} exact />
          <Route
            path="/admin/rolemaster/:name"
            element={<RoleMaster />}
            exact
          />
          <Route
            path="/admin/roleDefination"
            element={<RoleDefination />}
            exact
          />
          <Route
            path="/admin/roleDefination/:name"
            element={<RoleDefination />}
            exact
          />
          <Route path="/admin/userModule" element={<UserModule />} exact />
          <Route path="/admin/accessrole" element={<AccessRole />} exact />
          <Route
            path="/admin/subaccessrole"
            element={<SubAccessRoles />}
            exact
          />
          <Route path="/admin/getallrole" element={<AllRolesDetails />} exact />
          <Route
            path="/admin/viewaccessrole"
            element={<ViewAccessRole />}
            exact
          />
          <Route path="/admin/getalluser" element={<AllUser />} exact />
          <Route path="/vendorprofile" element={<StepperForm />} exact />

          <Route path="/admin/licencetable" element={<LicenceTable />} exact />
          <Route path="/admin/licencetype" element={<LicenceType />} exact />
          <Route
            path="/admin/communicationproducttable"
            element={<CommunicationProductTable />}
            exact
          />
          <Route
            path="/admin/communicationproduct"
            element={<CommunicationProduct />}
            exact
          />

          <Route
            path="/admin/communicationtable"
            element={<CommunicationTable />}
            exact
          />
          <Route
            path="/admin/communication"
            element={<Communication />}
            exact
          />
          <Route path="/admin/state" element={<State />} exact />
          <Route path="/admin/statetable" element={<StateTable />} exact />
          <Route
            path="/admin/vendorproduct"
            element={<AddVendorProduct />}
            exact
          />

          <Route path="/admin/licencetable" element={<LicenceTable />} exact />
          <Route path="/admin/licencetype" element={<LicenceType />} exact />
          <Route
            path="/admin/licencetype/:id,:name"
            element={<LicenceType />}
            exact
          />
          <Route
            path="/admin/communicationproducttable"
            element={<CommunicationProductTable />}
            exact
          />
          <Route
            path="/admin/communicationproduct"
            element={<CommunicationProduct />}
            exact
          />
          <Route
            path="/admin/communicationproduct/:id,:name"
            element={<CommunicationProduct />}
            exact
          />

          <Route
            path="/admin/communicationtable"
            element={<CommunicationTable />}
            exact
          />
          <Route
            path="/admin/communication"
            element={<Communication />}
            exact
          />
          <Route
            path="/admin/communication/:id,:name"
            element={<Communication />}
            exact
          />
          <Route path="/admin/state" element={<State />} exact />
          <Route path="/admin/state/:id,:name" element={<State />} exact />
          <Route path="/admin/statetable" element={<StateTable />} exact />
          <Route
            path="/admin/viewvendorproduct"
            element={<ViewVendorProduct />}
            exact
          />
          <Route path="/admin/viewvendor" element={<ViewTabs />} exact />
        </Routes>
      </>
    );
  }
};

export default Routing;
