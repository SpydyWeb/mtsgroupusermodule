import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { GetRole, GetsubRole, CreateMapping } from "../Services/Role";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AccessRole = () => {
  const [accessRoleData, setAccessroleData] = useState({
    role: [],
    subroles: [],
  });
  const Navigate = useNavigate();
  const [roleid, setRoleid] = useState(false);
  const [allRole, setAllRole] = useState([]);
  const [subrole, setsubrole] = useState([]);
  useEffect(() => {
    GetRole().then((res) => {
      setAllRole(res);
    });
    GetsubRole().then((res) => {
      setsubrole(res);
    });
  }, []);
  const onChangehandler = (evt, type) => {
    if (type === "role") {
      if (evt.target.checked) {
        let data = accessRoleData.role;
        data.push(evt.target.name);
        setAccessroleData({
          ...accessRoleData,
          role: data,
        });
      } else {
        let data = accessRoleData.role;
        data = data.filter((ele) => {
          return ele !== evt.target.name;
        });
        setAccessroleData({
          ...accessRoleData,
          role: data,
        });
      }
    } else {
      if (evt.target.checked) {
        let data = accessRoleData.subroles;
        data.push(evt.target.name);
        setAccessroleData({
          ...accessRoleData,
          subroles: data,
        });
      } else {
        let data = accessRoleData.subroles;
        data = data.filter((ele) => {
          return ele !== evt.target.name;
        });
        setAccessroleData({
          ...accessRoleData,
          subroles: data,
        });
      }
    }
  };
  const onClickhandler = () => {
    if (accessRoleData.role.length === 0 || accessRoleData.role.length === 0) {
      toast.error("Please Select role or access role");
    } else {
      CreateMapping(accessRoleData).then((res) => {
        if (res.status === 200) {
          toast.success("Mapping created successfully");
          setAccessroleData({ role: [], subroles: [] });
          setRoleid(false);

          Navigate("/admin/viewaccessrole");
        } else {
          toast.error("Somting wrong");
        }
      });
    }
  };
  return (
    <div>
      <Header />
      <Sidebar />{" "}
      <div className="content-wrapper px-4">
        <div classname="container">
          <div className="d-flex justify-end m-2 ">
            <button
              type="button"
              class="Btn_VA btn-success"
              onClick={() => Navigate("/admin/viewaccessrole")}
            >
              View
            </button>
          </div>
          <div className="border-2 border-gray-200 m-5 rounded-lg">
            <div className="bg-gray-300 p-2">Access Role</div>
            <div className="flex gap-2 m-2 flex-wrap">
              {allRole.map((ele, indx) => {
                return (
                  <div key={indx}>
                    <input
                      type={"checkbox"}
                      Checked={roleid}
                      name={ele.name}
                      onClick={(evt) => onChangehandler(evt, "role")}
                    />{" "}
                    <span>{ele.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-2 border-gray-200 m-5 rounded-lg">
            <div className="bg-gray-300 p-2">Access Role Defination</div>
            <div className="flex gap-3 m-2 flex-wrap">
              {subrole.map((ele, indx) => {
                return (
                  <div key={indx}>
                    <input
                      type={"checkbox"}
                      name={ele.subrole}
                      Checked={roleid}
                      onClick={(evt) => onChangehandler(evt, "subrole")}
                    />{" "}
                    <span>{ele.subrole}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end m-3">
              <button className="btn-donate " onClick={onClickhandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccessRole;
