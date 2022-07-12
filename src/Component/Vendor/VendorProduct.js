import React, { useEffect, useState } from "react";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Box,
  Button,
} from "@mui/material";
import Android12Switch from "./Android12Switch";
import Accordion from "@mui/material/Accordion";
import { AccordionSummary } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
const VendorProduct = (props) => {
  const handleNext = () => {
    let status = false;
    let count = 0;
    props.productD.map((ele) => {
      if (ele.selected === true) {
        count = 1;
        if (ele.price === 0) status = true;
      }
    });
    if (status || count === 0)
      toast.error("Please fill all the mandatory fields");
    else {
      props.setVendordata({ ...props.Vendordata, product: props.productD });
      props.setActiveStep((prev) => prev + 1);
    }
  };

  const handlechange = (e, indx, mainIndx, productid) => {
    const { name, value } = e.target;

    const data = [...props.productD];
    for (let index = 0; index < data.length; index++) {
      if (data[index].id === productid) {
        if (name === "selected") data[index].selected = !data[index].selected;
        else data[index].price = isNaN(value) ? "" : parseInt(value);
        break;
      }
    }
    props.setProductD(data);
    const productdata = [...props.productdata];
    if (name === "selected")
      productdata[mainIndx].subCategory[indx].selected = !productdata[mainIndx]
        .subCategory[indx].selected;
    else
      productdata[mainIndx].subCategory[indx].price = isNaN(value)
        ? ""
        : parseInt(value);
    props.setProductdata(productdata);
  };
  return (
    <>
      {props.productdata.map((ele, indx) => {
        if (ele.subCategory.length > 0) {
          return (
            <div className="mt-1" key={indx}>
              <Accordion>
                <AccordionSummary
                  //expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{ele.name}</Typography>
                </AccordionSummary>
                {ele.subCategory.map((val, i) => {
                  return (
                    <AccordionDetails>
                      <Typography>
                        <div className="flex">
                          <FormGroup key={i} className="flex flex-row gap-x-8">
                            <FormControlLabel
                              control={<Android12Switch />}
                              label={val.name}
                              name="selected"
                              checked={val.selected}
                              onChange={(e) => handlechange(e, i, indx, val.id)}
                            />
                            <TextField
                              label="Price"
                              variant="outlined"
                              size="small"
                              value={val.price}
                              onChange={(e) => handlechange(e, i, indx, val.id)}
                            />
                          </FormGroup>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  );
                })}
              </Accordion>
            </div>
          );
        } else return <></>;
      })}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={() => props.setActiveStep((prev) => prev - 1)}
          variant="contained"
          sx={{ m: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleNext} variant="contained" sx={{ m: 1 }}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default VendorProduct;
