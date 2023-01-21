import React, { useEffect, useState } from 'react';
// import Header from "../../../Admin/Header";
// import Sidebar from "../../../Admin/Sidebar";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import Footer from '../../../Admin/Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { GetVendorProduct } from '../../../servicesapi/Vendorapi';
import MainCard from 'ui-component/cards/MainCard';
const ViewVendorProduct = () => {
    const Navigate = useNavigate();
    const [rowdata, setRowData] = useState([]);
    const columnname = [
        { field: 'id', headerName: 'S. No.', flex: 1 },
        { field: 'Categoryname', headerName: 'Category Name', flex: 1 },
        { field: 'Productname', headerName: 'Product Name', flex: 1 }
    ];
    useEffect(() => {
        GetVendorProduct().then((res) => {
            let count = 0;
            let data = [];
            console.log(res);
            res.map((ele) => {
                if (ele.subCategory.length > 0) {
                    ele.subCategory.map((val) => {
                        count++;
                        data.push({
                            Categoryname: ele.name,
                            Productname: val.name,
                            id: count
                        });
                    });
                } else {
                    count++;
                    data.push({
                        Categoryname: ele.name,
                        Productname: '',
                        id: count
                    });
                }
            });
            console.log(data);
            setRowData(data);
        });
    }, []);
    return (
        <MainCard>
            {/* <Header />
      <Sidebar /> */}
            <div className="content-wrapper px-4">
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <button
                        type="button"
                        style={{ background: '#349164', padding: '5px', color: 'white' }}
                        onClick={() => Navigate('/admin/addvendorproduct')}
                    >
                        Add
                    </button>
                </div>

                <div style={{ display: 'flex', height: '500px' }} className="mt-4">
                    <DataGrid rows={rowdata} components={{ Toolbar: GridToolbar }} columns={columnname} />
                </div>
            </div>
            {/* <Footer /> */}
        </MainCard>
    );
};

export default ViewVendorProduct;
