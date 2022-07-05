import React from "react";
import { TextField, FormGroup, FormControlLabel } from "@mui/material";
import Android12Switch from "./Android12Switch";

const VendorProduct = () => {
  const ProductData = [
    {
      category: "Appraisal Product",
      Product: [{ name: "Laptop" }, { name: "Mouse" }, { name: "Keyboard" }],
    },
    {
      category: "AWM Product",
      Product: [{ name: "Laptop" }, { name: "Mouse" }, { name: "Keyboard" }],
    },
  ];
  return (
    <>
      {ProductData.map((ele, indx) => {
        console.log(ele);
        return (
          <div className="flex flex-col gap-6 border-2 py-3 mb-3" key={indx}>
            <h4> {ele.category}</h4>
            <div>
              {ele.Product.map((val, i) => {
                return (
                  <div>
                    <FormGroup key={i}>
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
        );
      })}
    </>
  );
};

export default VendorProduct;
