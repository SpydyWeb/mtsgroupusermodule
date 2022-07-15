import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { TextField } from "@mui/material";
import { AddState, UpdateState } from "../Services/Vendor";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const State = () => {
  const { id, name } = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    if (id !== undefined) setData({ name: name });
  }, []);
  const [Data, setData] = useState({ name: "" });

  const SubmitHandler = () => {
    if (Data.name === "" || Data.name === undefined) {
      toast.error("Enter State Type name");
    } else {
      if (id === undefined) {
        AddState(Data).then((res) => {
          if (res.status === 200) {
            toast.success("State Type Created Succsessfully");
            Navigate("/admin/statetable");
          } else {
            toast.error("Technical Issue");
          }
        });
      } else {
        UpdateState(Data, id).then((res) => {
          if (res.status === 200) {
            toast.success("Updated Successfully");
            Navigate("/admin/statetable");
          } else {
            toast.error("Technical Issue");
          }
        });
      }
    }
  };
  return (
    <>
      {/* {" "}
      <Header />
      <Sidebar /> */}
      <div className="content-wrapper px-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/statetable")}
          >
            View
          </button>
        </div>
        <div classname="container flex  justify-center items-center ">
          <div className="flex   m-2 lg:justify-center">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-xs w-full">
              <div className="p-3 px-5 bg-white   text-center">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 text-center">
                  State
                </h3>
                <form className="flex flex-col space-y-2">
                  <div>
                    <TextField
                      id="name"
                      label="State Name"
                      variant="outlined"
                      size="small"
                      value={Data.name}
                      onChange={(e) => setData({ name: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-x-5">
                    <button
                      className="btn-donate w-full mb-4"
                      onClick={SubmitHandler}
                    >
                      Submit
                    </button>
                    <button
                      className="btn-donate w-full mb-4"
                      style={{ backgroundColor: "#d20000" }}
                      onClick={() => Navigate("/admin/statetable")}
                    >
                      Cancel
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

export default State;
