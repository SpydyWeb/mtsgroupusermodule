import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { TextField } from "@mui/material";
import { AddCommunication } from "../Services/Vendor";
import toast from "react-hot-toast";
const CommunicationProduct = () => {
  const [Data, setData] = useState({ name: "" });

  const SubmitHandler = () => {
    if (Data.name === "" || Data.name === undefined) {
      toast.error("Enter Communication Type name");
    } else {
      AddCommunication(Data).then((res) => {
        if (res.status === 200) {
          toast.success("Communication Type Created Succsessfully");
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
      <div className="content-wrapper flex  justify-center items-center">
        <div classname="container">
          <div className="flex   m-2 ">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-2xl w-full">
              <div className="p-3 px-5 bg-white   text-center">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 text-center">
                  Communication Type
                </h3>
                <form className="flex flex-col space-y-2">
                  <div>
                    <TextField
                      id="name"
                      label="Communication Type Name"
                      variant="outlined"
                      fullWidth
                      value={Data.name}
                      onChange={(e) => setData({ name: e.target.value })}
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

export default CommunicationProduct;
