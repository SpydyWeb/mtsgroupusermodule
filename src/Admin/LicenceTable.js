import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { GetLicenceType } from "../Services/Vendor";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const LicenceTable = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    GetLicenceType().then((res) => {
      let data = [];
      res.map((ele) => {
        return data.push({
          id: ele.id,
          name: ele.name,
          createdDate: ele.createdDate,
          updateDate: ele.updateDate,
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
              //   onClick={() => {
              //     Navigate(`/admin/rolemaster/${params.row.subrole}`);
              //   }}
            />
            <FaTrash
              title="Delete"
              className="iconStyle text-danger"
              style={{ padding: "6px" }}
              //   onClick={() => DeleteRole(params.row.subrole)}
            />
          </div>
        );
      },
      flex: 1,
    },
  ];
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper px-4">
        <div className="d-flex justify-end mt-2">
          <button
            type="button"
            class="Btn_VA btn-success"
            onClick={() => Navigate("/admin/licencetype")}
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
    </div>
  );
};
export default LicenceTable;
