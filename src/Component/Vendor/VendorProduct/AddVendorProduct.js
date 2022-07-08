import React, { useState, useEffect } from "react";
import Header from "../../../Admin/Header";
import Sidebar from "../../../Admin/Sidebar";
import {
  GetVendorProduct,
  AddVendorProductList,
} from "../../../Services/Vendor";
import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";
const AddVendorProduct = () => {
  const [CategoryProduct, setCategoryProduct] = useState([]);
  const [inputval, setinputval] = useState("");
  const [productData, setproductData] = useState({
    name: "",
    productid: "",
  });
  useEffect(() => {
    GetVendorProduct().then((res) => {
      console.log(res);
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
    if (productData.name === "") toast.error("Please enter product name");
    else {
      AddVendorProductList(productData).then((res) => {
        if (res.status === 200) {
          toast.success("Product has been successfully");
          setproductData({
            name: "",
            productid: "",
          });
          setinputval("");
        } else {
          res.json().then((val) => toast.error(val));
        }
      });
    }
  };
  return (
    <div>
      {" "}
      <Header />
      <Sidebar />
      <div className="content-wrapper flex  justify-center ">
        <div classname="container">
          <div classname="container flex  justify-center items-center ">
            <div className="flex lg:justify-center">
              <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-xs w-full">
                <div className="p-3 px-5 bg-white  ">
                  <h3 className="mb-4 text-2xl font-semibold text-gray-700 text-center">
                    Vendor Product
                  </h3>
                  <form className="flex flex-col space-y-2">
                    <div>
                      <TextField
                        label="Product Name *"
                        variant="outlined"
                        size="small"
                        value={productData.name}
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
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
                            productid: newValue.id,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Category Product" />
                        )}
                      />
                    </div>
                    <div>
                      <button
                        className="btn-donate w-full mb-4"
                        onClick={HandleSubmit}
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
      </div>
    </div>
  );
};

export default AddVendorProduct;
