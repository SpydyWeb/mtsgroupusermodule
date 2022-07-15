import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import DropDownBox from "../Component/InputFields/DropDownBox";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "./Footer";
import { GetRole, CreateSubRole, EditRoleDefination } from "../Services/Role";
import toast from "react-hot-toast";
const RoleDefination = () => {
  const { name } = useParams();
  const Navigate = useNavigate();
  const [allrole, setAllrole] = useState([]);
  const [RoleDefinationData, setRoledDefinationData] = useState({
    role: "",
    subrole: "",
  });
  useEffect(() => {
    if (name !== undefined) {
      setRoledDefinationData({ subrole: name });
    } else {
      GetRole().then((res) => {
        const data = [];
        res.map((ele) => data.push(ele.name));
        setAllrole(data);
      });
    }
  }, []);
  const onChangeHandle = (evt) => {
    setRoledDefinationData({
      ...RoleDefinationData,
      [evt.target.name]: evt.target.value,
    });
  };
  const onClickhandler = (evt) => {
    evt.preventDefault();

    if (RoleDefinationData.subrole === "")
      toast.error("Please Enter all mandatory fields");
    else {
      if (name === undefined) {
        CreateSubRole(RoleDefinationData).then((res) => {
          if (res.status === 200) {
            toast.success("Access control updated successfully");
            setRoledDefinationData({ subrole: "" });
            Navigate("/admin/subaccessrole");
          }
        });
      } else
        EditRoleDefination({
          oldname: name,
          newName: RoleDefinationData.subrole,
        }).then((res) => {
          if (res.status === 200) {
            toast.success("Role Updated succesfully");
            setRoledDefinationData({ subrole: "" });
            Navigate("/admin/subaccessrole");
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  };
  return (
    <div>
      {/* <Header />
      <Sidebar /> */}
      <div className="content-wrapper px-4 mt-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/subaccessrole")}
          >
            View
          </button>
        </div>
        <div classname="container flex  justify-center items-center">
          <div className="flex   m-2  lg:justify-center">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-xl">
              <div className="p-3 px-5 bg-white w-full ">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 ">
                  Access Control Master
                </h3>
                <form className="flex flex-col space-y-5">
                  {/* <div className="flex flex-col  mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=" AccessRoleType"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Access Role Type
                      </label>
                    </div>
                    <DropDownBox
                      placeHolder={"Select user type"}
                      name={"role"}
                      ddldata={allrole}
                      onChangeHandle={onChangeHandle}
                      value={RoleDefinationData.role}
                    />
                  </div> */}
                  <div className="flex flex-col  mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="Access Role"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Access Control Name
                      </label>
                    </div>
                    <input
                      type="text"
                      id="subrole"
                      name="subrole"
                      value={RoleDefinationData.subrole}
                      onChange={onChangeHandle}
                      className="px-4 py-2 bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <button
                      className="btn-donate w-full mb-4"
                      onClick={onClickhandler}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoleDefination;
