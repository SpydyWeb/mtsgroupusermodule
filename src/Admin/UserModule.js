import React from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import DropDownBox from "../Component/InputFields/DropDownBox";
import Registration from "../Component/Headers/Register";
import { useNavigate } from "react-router-dom";
const UserModule = () => {
  const Navigate = useNavigate();
  return (
    <div>
      {/* <Header />
      <Sidebar /> */}
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
