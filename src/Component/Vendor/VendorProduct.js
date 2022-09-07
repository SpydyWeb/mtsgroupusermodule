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
import { UpdateVendorproducts } from "../../Services/Vendor";
import { FcExpand } from "react-icons/fc";
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
  const handleEditSubmit = () => {
    // let status = false;
    // let count = 0;
    // props.productD.map((ele) => {
    //   if (ele.selected === true) {
    //     count = 1;
    //     if (ele.price === 0) status = true;
    //   }
    // });
    // if (status || count === 0)
    //   toast.error("Please fill all the mandatory fields");
    // else {
    UpdateVendorproducts(props.productdata, props.selecetedVedorId).then(
      (res) => {
        if (res.status === 200) {
          toast.success("Data updated succsessfully");
          props.seteditModalOpen((prev) => !prev);
          for (let index = 0; index < props.productdata.length; index++) {
            if (props.productdata[index].subCategory !== null) {
              props.productdata[index].subCategory.forEach((element) => {
                let status = true;
                if(element.selected){
                props.vendorDetail.product.forEach((val) => {
                  if (element.id === val.id) {
                    val.price = element.price;
                    status = false;
                  }
                });
                if (status) {
                  props.vendorDetail.product.push({
                    id: 2,
                    name: element.name,
                    price:element.price,
                    productId: 0,
                    selected: true,
                    subCategory: null,
                  });
                }}
              });
            }
          }
          props.setVendorDetail({
            ...props.vendorDetail,
            ["communication"]: props.communication,
          });
        } else {
          res.json().then((res) => toast.error(res));
        }
      }
    );
    //  }
  };
  return (
    <>
      <div className="flex flex-wrap">
        {props.productdata.map((ele, indx) => {
          if (ele.subCategory&&ele.subCategory.length > 0) {
            return (
              <div className="mt-1 col-md-6" key={indx}>
                <Accordion className="max-h-[250px] overflow-y-auto">
                  <AccordionSummary
                    expandIcon={<FcExpand />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ borderBottom: "1px solid lightgray" }}
                  >
                    <Typography style={{ fontWeight: "700" }}>
                      {ele.name}
                    </Typography>
                  </AccordionSummary>
                  {ele.subCategory.map((val, i) => {
                    return (
                      <AccordionDetails>
                        <Typography>
                          <div className="flex">
                            <FormGroup
                              key={i}
                              className="flex flex-row gap-x-8"
                            >
                              <FormControlLabel
                                style={{ minWidth: "132px" }}
                                control={<Android12Switch />}
                                label={val.name}
                                name="selected"
                                checked={val.selected}
                                onChange={(e) =>
                                  handlechange(e, i, indx, val.id)
                                }
                              />

                              <TextField
                                label="Price"
                                variant="outlined"
                                size="small"
                                value={val.price}
                                onChange={(e) =>
                                  handlechange(e, i, indx, val.id)
                                }
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
      </div>
      <Box
        sx={{
          display: props.edit ? "none" : "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "end",
        }}
      >
        <Button
          disabled={props.activeStep === 0}
          onClick={() => props.setActiveStep((prev) => prev - 1)}
          variant="contained"
          sx={{ m: 1 }}
        >
          Back
        </Button>

        <Button onClick={handleNext} variant="contained" sx={{ m: 1 }}>
          Next
        </Button>
      </Box>
      <Box
        sx={{
          display: props.edit ? "flex" : "none",
          flexDirection: "row",
          pt: 2,
          justifyContent: "end",
        }}
      >
        <Button onClick={handleEditSubmit} variant="contained" sx={{ m: 1 }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default VendorProduct;
