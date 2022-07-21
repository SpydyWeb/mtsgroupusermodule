import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  GetCommunicationProductType,
  DeleteCommuncationProductType,
} from "../Services/Vendor";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const CommunicationProductTable = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    GetCommunicationProductType().then((res) => {
      let data = [];
      res.map((ele, indx) => {
        return data.push({
          id: indx + 1,
          name: ele.name,
          createdDate: ele.createdDate.substring(0, 10),
          updateDate: ele.updateDate.substring(0, 10),
        });
      });
      setRowData(data);
    });
  }, []);
  const [rowdata, setRowData] = useState([]);
  const columnname = [
    { field: "id", headerName: "S.no", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "createdDate", headerName: "Created Date", flex: 1 },
    { field: "updateDate", headerName: "Update Date", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      renderCell: (params) => {
        console.log(params.row.name);
        return (
          <div className="gap-3 d-flex">
            <AiFillEdit
              title="Edit"
              className="iconStyle"
              onClick={() => {
                Navigate(
                  `/admin/communicationproduct/${params.row.id},${params.row.name}`
                );
              }}
            />
            <FaTrash
              title="Delete"
              className="iconStyle text-danger"
              style={{ padding: "6px" }}
              onClick={() => DeleteRole(params.row.id)}
            />
          </div>
        );
      },
      flex: 1,
    },
  ];
  const DeleteRole = (id) => {
    if (window.confirm("Do you want to delete this communication product?")) {
      DeleteCommuncationProductType(id).then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully");
          setInterval(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Technical Issue");
        }
      });
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
            onClick={() => Navigate("/admin/communicationproduct")}
          >
            Add
          </button>
        </div>

        <div style={{ display: "flex", height: "500px" }} className="mt-4">
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
export default CommunicationProductTable;
