import React, { useEffect, useState } from "react";
import { TextField, FormGroup, FormControlLabel } from "@mui/material";
import Android12Switch from "./Android12Switch";
import { GetVendorProduct } from "../../Services/Vendor";
const VendorProduct = (props) => {
  return (
    <>
      {props.product.map((ele, indx) => {
        if (ele.subCategory.length > 0) {
          return (
            <div className="mt-5" key={indx}>
              <span className="legend Btn_Gradient">{ele.name}</span>
              <div className="flex flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
                <div>
                  {ele.subCategory.map((val, i) => {
                    return (
                      <div className="flex">
                        <FormGroup key={i} className="flex flex-row gap-x-8">
                          <FormControlLabel
                            control={<Android12Switch />}
                            label={val.name}
                          />
                          <TextField
                            id="firstname"
                            label="Price"
                            variant="outlined"
                            size="small"
                          />
                        </FormGroup>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        } else return <></>;
      })}
    </>
  );
};

export default VendorProduct;
