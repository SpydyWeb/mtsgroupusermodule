import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "./Footer";
import toast from "react-hot-toast";
import { CreateRole, EditRole } from "../Services/Role";
const RoleMaster = () => {
  const Navigate = useNavigate();
  const { name } = useParams();

  const [RoleMaster, setRoleMaster] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    var item_value = sessionStorage.getItem("roleDescription");
    if (name !== undefined) {
      setRoleMaster({ name: name, description: item_value });
    }
  }, []);

  const onClickHandler = (evt) => {
    evt.preventDefault();
    if (RoleMaster.name === "" || RoleMaster.description === "")
      toast.error("Please enter all mandatory fields");
    else {
      if (name === undefined) {
        CreateRole(RoleMaster).then((res) => {
          if (res.status === 200) {
            res.json().then((res) => toast.success(res));
            setRoleMaster({ name: "", description: "" });
            Navigate("/admin/getallrole");
          } else {
            res.json().then((res) => toast.error(res));
          }
        });
      } else {
        EditRole({
          oldrole: name,
          newName: RoleMaster.name,
          newDescription: RoleMaster.description,
        }).then((res) => {
          if (res.status === 200) {
            res.json().then((res) => toast.success(res));
            setRoleMaster({ name: "", description: "" });
            Navigate("/admin/getallrole");
          } else {
            res.json().then((res) => toast.error(res));
          }
        });
      }
    }
  };
  return (
    <div>
      {/* <Header />
      <Sidebar /> */}
      <div className="content-wrapper px-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/getallrole")}
          >
            View
          </button>
        </div>
        <div classname="container  flex  justify-center items-center">
          <div className="flex   m-2  lg:justify-center">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-xl">
              <div className="p-3 px-5 bg-white w-full ">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 ">
                  Role Master
                </h3>
                <form className="flex flex-col space-y-5">
                  <div className="flex flex-col  mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="RoleType"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Role Name <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <input
                      value={RoleMaster.name}
                      onChange={(evt) =>
                        setRoleMaster({
                          ...RoleMaster,
                          [evt.target.name]: evt.target.value,
                        })
                      }
                      type="text"
                      name="name"
                      className="p-2 bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col  mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="RoleType"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Description <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <textarea
                      rows={3}
                      value={RoleMaster.description}
                      onChange={(evt) =>
                        setRoleMaster({
                          ...RoleMaster,
                          [evt.target.name]: evt.target.value,
                        })
                      }
                      name="description"
                      className="p-2 w-full transition duration-300 bg-sky-100 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    ></textarea>
                  </div>
                  <div className="flex justify-between space-x-2 items-center flex-wrap mb-4">
                    <button
                      className="btn-donate w-full  py-2"
                      onClick={onClickHandler}
                    >
                      Save Role
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

export default RoleMaster;
