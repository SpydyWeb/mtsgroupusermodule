import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { TextField } from "@mui/material";
import { AddLicenceType, UpdateLicenceType } from "../Services/Vendor";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const LicenceType = () => {
  const { id, name } = useParams();

  const Navigate = useNavigate();
  const [LicName, setLicName] = useState({ name: "" });
  useEffect(() => {
    if (id !== undefined) setLicName({ name: name });
  }, []);
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (LicName.name === "" || LicName.name === undefined) {
      toast.error("Please enter all mandatory fields");
    } else {
      if (id === undefined) {
        AddLicenceType(LicName).then((res) => {
          if (res.status === 200) {
            toast.success("Licence Created Succsessfully");
            Navigate("/admin/licencetable");
          } else {
            res.json().then((res) => toast.error(res));
          }
        });
      } else {
        UpdateLicenceType(LicName, id).then((res) => {
          if (res.status === 200) {
            toast.success("Updated Successfully");
            Navigate("/admin/licencetable");
          } else {
            res.json().then((res) => toast.error(res));
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
            onClick={() => Navigate("/admin/licencetable")}
          >
            View
          </button>
        </div>
        <div classname="container flex  justify-center items-center ">
          <div className="flex lg:justify-center">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-xs w-full">
              <div className="p-3 px-5 bg-white  ">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 text-center">
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
                  <div className="flex gap-x-5 justify-end mt-2">
                    <button
                      className="btn-donate  mb-2"
                      style={{
                        backgroundColor: "transparent",
                        color: "rgb(34 166 179)",
                      }}
                      onClick={() => Navigate("/admin/licencetable")}
                    >
                      Cancel
                    </button>

                    <button className="btn-donate mb-2" onClick={SubmitHandler}>
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
