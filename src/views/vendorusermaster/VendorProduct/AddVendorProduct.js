import React, { useState, useEffect } from 'react';
// import Header from "../../../Admin/Header";
// import Sidebar from "../../../Admin/Sidebar";
import { GetVendorProduct, AddVendorProductList } from '../../../servicesapi/Vendorapi';
import { TextField, Autocomplete } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
const AddVendorProduct = () => {
    const Navigate = useNavigate();
    const [CategoryProduct, setCategoryProduct] = useState([]);
    const [inputval, setinputval] = useState('');
    const [productData, setproductData] = useState({
        name: '',
        productid: 0
    });
    const [type, setType] = useState(true);
    useEffect(() => {
        GetVendorProduct().then((res) => {
            if (res && res.length > 0) {
                let data = [];
                res.map((ele) => {
                    data.push({ id: ele.id, label: ele.name });
                });
                setCategoryProduct(data);
            }
        });
    }, []);
    const HandleSubmit = () => {
        if (productData.name === '') toast.error('Please enter product name');
        else {
            AddVendorProductList(productData).then((res) => {
                if (res.status === 200) {
                    toast.success('Product has been successfully');
                    setproductData({
                        name: '',
                        productid: ''
                    });
                    setinputval('');
                    Navigate('/admin/viewvendorproduct');
                } else {
                    res.json().then((val) => toast.error(val));
                }
            });
        }
    };
    return (
        <MainCard>
            {' '}
            {/* <Header />
      <Sidebar /> */}
            <div className="content-wrapper  ">
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <button
                        type="button"
                        style={{ background: '#349164', padding: '5px', color: 'white' }}
                        onClick={() => Navigate('/admin/viewvendorproduct')}
                    >
                        View
                    </button>
                </div>
                <div classname="container">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="flex lg:justify-center">
                            <div style={{ width: '300px' }}>
                                <div className="p-3 px-5 bg-white  ">
                                    <h3 className="mb-4 text-2xl font-semibold text-gray-700 text-center">Vendor Product</h3>
                                    <form className="flex flex-col space-y-2">
                                        <div style={{ marginBottom: '15px' }}>
                                            <TextField
                                                label={type ? 'Product Name *' : 'Category Name *'}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                value={productData.name}
                                                onChange={(e) =>
                                                    setproductData({
                                                        ...productData,
                                                        name: e.target.value
                                                    })
                                                }
                                            />
                                        </div>

                                        {type ? (
                                            <div style={{ marginBottom: '15px' }}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={CategoryProduct}
                                                    size="small"
                                                    inputValue={inputval}
                                                    getOptionLabel={(option) => option.label}
                                                    onInputChange={(event, newInputValue) => {
                                                        setinputval(newInputValue);
                                                    }}
                                                    onChange={(event, newValue) => {
                                                        setproductData({
                                                            ...productData,
                                                            productid: newValue.id
                                                        });
                                                    }}
                                                    renderInput={(params) => <TextField {...params} label="Category Product" />}
                                                />
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <div>
                                            <button className="btn-donate w-full mb-2" onClick={HandleSubmit}>
                                                Submit
                                            </button>
                                            <button
                                                className="btn-donate  w-full mb-4 "
                                                onClick={() => {
                                                    setType((prev) => !prev);
                                                }}
                                            >
                                                {type ? 'Add Category' : 'Back'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainCard>
    );
};

export default AddVendorProduct;
