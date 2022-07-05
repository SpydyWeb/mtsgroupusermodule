import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { TextField } from "@mui/material";
import { AddLicenceType } from "../Services/Vendor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LicenceType = () => {
  const Navigate = useNavigate();
  const [LicName, setLicName] = useState({ name: "" });

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (LicName.name === "" || LicName.name === undefined) {
      toast.error("Please enter all mandatory fields");
    } else {
      AddLicenceType(LicName).then((res) => {
        if (res.status === 200) {
          toast.success("Licence Created Succsessfully");
          Navigate("/admin/licencetable");
        } else {
          toast.error("Technical Issue");
        }
      });
    }
  };

  return (
    <>
      {" "}
      <Header />
      <Sidebar />
      <div className="content-wrapper px-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/licencetable")}
          >
            View
          </button>
        </div>
        <div classname="container flex  justify-center items-center ">
          <div className="flex lg:justify-center">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-xs w-full">
              <div className="p-3 px-5 bg-white  ">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 ">
                  Licence Type
                </h3>
                <form className="flex flex-col space-y-2">
                  <div>
                    <TextField
                      id="name"
                      label="Licence Name"
                      variant="outlined"
                      size="small"
                      value={LicName.name}
                      onChange={(e) => setLicName({ name: e.target.value })}
                    />
                  </div>
                  <div>
                    <button
                      className="btn-donate w-full mb-4"
                      onClick={SubmitHandler}
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
    </>
  );
};

export default LicenceType;
