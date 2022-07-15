import React, { useEffect, useState } from "react";
import { GetRole, Deleterole } from "../Services/Role";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const AllRolesDetails = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    GetRole().then((res) => {
      let data = [];
      let count = 0;
      res.map((ele) => {
        return data.push({
          id: ++count,
          name: ele.name,
          description: ele.description,
        });
      });
      setRowData(data);
    });
  }, []);
  const [rowdata, setRowData] = useState([]);
  const columnname = [
    { field: "id", headerName: "S No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div className="gap-3 d-flex">
            <AiFillEdit
              title="Edit"
              className="iconStyle"
              onClick={() => {
                sessionStorage.setItem(
                  "roleDescription",
                  params.row.description
                );
                Navigate(`/admin/rolemaster/${params.row.name}`);
              }}
            />
            <FaTrash
              title="Delete"
              className="iconStyle text-danger"
              style={{ padding: "6px" }}
              onClick={() => DeleteRole(params.row.name)}
            />
          </div>
        );
      },
      flex: 1,
    },
  ];
  const DeleteRole = (name) => {
    if (window.confirm("Do you want to delete this role ?")) {
      Deleterole(name).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => toast.success(res));
          setInterval(() => {
            window.location.reload();
          }, 1000);
        } else {
          res.json().then((res) => toast.error(res));
        }
      });
    }
  };

  return (
    <>
      <div className="content-wrapper px-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/rolemaster")}
          >
            Add
          </button>
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
    </>
  );
};

export default AllRolesDetails;
