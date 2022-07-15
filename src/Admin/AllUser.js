import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { GetRole, AssignRole } from "../Services/Role";
import { GetAllUSer } from "../Services/User";
import { TextField, Autocomplete } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const AllUser = () => {
  const Navigate = useNavigate();
  const [userEmail, setUserEmail] = useState([]);
  const [AllUser, setAllUser] = useState([]);
  const [role, setrole] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    role: "",
  });
  const [rowdata, setRowData] = useState([]);
  const columnname = [
    { field: "id", headerName: "S No.", width: 50 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "username", headerName: "User Name", width: 150 },
    { field: "userType", headerName: "User Type", width: 150 },
    { field: "emailId", headerName: "Email Id", width: 250 },
    { field: "outEmail", headerName: "Out Email", width: 150 },
    { field: "cellPhone", headerName: "Cell Phone", width: 150 },
    { field: "allowTextMsg", headerName: "Allow Text Msg", width: 150 },
    { field: "manager", headerName: "Manager", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "workStart", headerName: "Work Start", width: 150 },
    { field: "workEnd", headerName: "Work End", width: 150 },
    { field: "emailSignature", headerName: "Email Signature", width: 150 },
    { field: "roles", headerName: "User Role", width: 250 },
  ];
  useEffect(() => {
    GetAllUSer().then((res) => {
      let data = [];
      res.map((ele) => data.push(ele.emailId));
      setUserEmail(data);
      let Udata = [];
      let count = 0;
      res.map((ele) => {
        return Udata.push({
          id: ++count,
          name: ele.name,
          username: ele.username,
          userType: ele.userType,
          emailId: ele.emailId,
          outEmail: ele.outEmail,
          cellPhone: ele.cellPhone,
          allowTextMsg: ele.allowTextMsg,
          manager: ele.manager,
          department: ele.department,
          workEnd: ele.workEnd,
          workStart: ele.workStart,
          roles: ele.roles,
        });
      });
      setRowData(Udata);
      setAllUser(res);
    });
    GetRole().then((res) => {
      let data = [];
      res.map((ele) => data.push(ele.name));

      setrole(data);
    });
  }, []);

  return (
    <div>
      {/* <Header />
      <Sidebar /> */}
      <div className="content-wrapper px-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/userModule")}
          >
            Add
          </button>
        </div>
        <div className="border-2 w-[60%] p-4 rounded-xl">
          <h1 className="text-lg mb-3">Assign role</h1>
          <div className="flex gap-3 items-center ">
            <div>
              <Autocomplete
                inputValue={userData.email}
                onInputChange={(event, newInputValue) => {
                  setUserData({ ...userData, email: newInputValue });
                }}
                options={userEmail}
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Email Id" />
                )}
              />
            </div>
            <div>
              {/* <div className="text-gray-500 text-sm font-semibold">
                {" "}
                Role <span className="text-red-500">*</span>
              </div> */}
              <Autocomplete
                inputValue={userData.role}
                onInputChange={(event, newInputValue) => {
                  setUserData({ ...userData, role: newInputValue });
                }}
                options={role}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Role" />}
              />
              {/* <select
                value={userData.role}
                name="role"
                onChange={(evt) => {
                  setUserData({ ...userData, role: evt.target.value });
                }}
                className="px-2 w-40 py-2 transition duration-300 border inputFull border-gray-300 rounded focus:border-transparent focus:outline-none bg-sky-100 focus:ring-4 focus:ring-blue-200"
              >
                <option selected={false}>Select</option>
                {role.map((ele, indx) => {
                  return (
                    <option key={indx} value={ele.name}>
                      {ele.name}
                    </option>
                  );
                })}
              </select> */}
            </div>
            <button
              className="btn-donate mt-3 py-2"
              onClick={() => {
                if (userData.role === "" || userData.email === "")
                  toast.error("Please enter mandatory fields");
                else {
                  AssignRole(userData).then((res) => {
                    toast.success("Role assigned successfully");
                    setInterval(() => {
                      window.location.reload();
                    }, 1000);
                  });
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
        <div style={{ display: "flex", height: "300px" }} className="mt-4">
          <DataGrid
            rows={rowdata}
            components={{ Toolbar: GridToolbar }}
            columns={columnname}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllUser;
