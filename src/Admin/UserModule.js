import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import DropDownBox from "../Component/InputFields/DropDownBox";
import Registration from "../Component/Headers/Register";
import { useNavigate } from "react-router-dom";
const UserModule = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper px-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/getallUser")}
          >
            View
          </button>
        </div>
        <div classname="container flex  justify-center items-center">
          <div className="flex   m-2  lg:justify-center">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-[43rem]">
              <div className="p-3 px-2 bg-white w-full ">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 ">
                  User Registration
                </h3>
                <form className="flex flex-col space-y-5">
                  <div className="flex flex-col mt-2 mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=" AccessRoleType"
                        className="text-sm font-semibold text-gray-500"
                      >
                        User Type
                      </label>
                    </div>
                    <DropDownBox
                      placeHolder={"Select user type"}
                      name={"userType"}
                    />
                  </div>
                  <div className="flex gap-2 mt-2  mb-1 ">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="First Name"
                          className="text-sm font-semibold text-gray-500"
                        >
                          First Name
                        </label>
                      </div>
                      <input
                        type="text"
                        id="Firstname"
                        name="FirstName"
                        placeholder=" Enter First Name"
                        className="px-1 py-2 w-full bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="Last Name"
                          className="text-sm font-semibold text-gray-500"
                        >
                          Last Name
                        </label>
                      </div>
                      <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        placeholder=" Enter Last Name"
                        className="px-1 py-2 w-full bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mt-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="Email"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Email
                      </label>
                    </div>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      placeholder=" Enter Email"
                      className="px-1 py-2 bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>

                  {/* <div>
                    <button type="submit" className="btn-donate w-full mb-4">
                      Submit
                    </button>
                  </div> */}
                  <Registration />
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

export default UserModule;
