import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { GetsubRole, DeleteroleDefunation } from "../Services/Role";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const SubAccessRoles = () => {
  const Navigate = useNavigate();
  const [SubRoles, setSubRoles] = useState([]);

  useEffect(() => {
    GetsubRole().then((res) => {
      setSubRoles(res);
      let data = [];
      let count = 0;
      res.map((ele) => {
        return data.push({
          id: ++count,
          name: ele.subrole,
        });
      });
      setRowData(data);
    });
  }, []);
  const [rowdata, setRowData] = useState([]);
  const columnname = [
    { field: "id", headerName: "S No.", flex: 1 },
    { field: "name", headerName: "Access Name", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        console.log(params.row.name);
        return (
          <div className="gap-3 d-flex">
            <AiFillEdit
              title="Edit"
              className="iconStyle"
              onClick={() => {
                Navigate(`/admin/roleDefination/${params.row.name}`);
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
    DeleteroleDefunation(name).then((res) => {
      if (window.confirm("Do you want to delete this access control ?")) {
        if (res.status === 200) {
          toast.success("Role delete");
          setInterval(() => {
            window.location.reload();
          }, 1000);
        } else {
          res
            .json()
            .then((res) =>
              toast.error(`This access role is associated with  ${res} role(s)`)
            );
        }
      }
    });
  };

  return (
    <>
      {/* <Header />
      <Sidebar /> */}
      <div className="content-wrapper px-4 mt-4">
        <div className="d-flex justify-end my-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/roleDefination")}
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

export default SubAccessRoles;
