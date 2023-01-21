import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Android12Switch from 'ui-component/Android12Switch';
import {
    TextField,
    FormGroup,
    FormControlLabel,
    Box,
    Accordion,
    Button,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid
} from '@mui/material';
import { FcExpand } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
const ProductForm = (props) => {
    const { customization, VendorData } = useSelector((state) => state);
    return (
        <MainCard>
            <Grid container spacing={5}>
                {VendorData.ProductData.length > 0 ? (
                    VendorData.ProductData.map((ele) => {
                        return ele.subCategory.length > 0 ? (
                            <Grid item xs={6}>
                                <Accordion className="max-h-[250px] overflow-y-auto">
                                    <AccordionSummary
                                        expandIcon={<FcExpand />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{ borderBottom: '1px solid lightgray' }}
                                    >
                                        <Typography style={{ fontWeight: '700' }}>{ele.name}</Typography>
                                    </AccordionSummary>
                                    {ele.subCategory.map((val, i) => {
                                        return (
                                            <AccordionDetails>
                                                <Typography>
                                                    <div className="flex">
                                                        <FormGroup key={i} className="flex flex-row gap-x-8">
                                                            <div className="w-[30%]">
                                                                <FormControlLabel
                                                                    style={{ minWidth: '132px' }}
                                                                    control={<Android12Switch />}
                                                                    label={val.name}
                                                                    name="selected"
                                                                    checked={val.selected}
                                                                    disabled={props.editData}
                                                                    onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                />
                                                            </div>
                                                            {customization.isOpen[0] === 'vendor' || props.edit === true ? (
                                                                <div className="flex w-[60%] gap-1">
                                                                    <div className="w-[30%]">
                                                                        <TextField
                                                                            inputProps={{
                                                                                inputMode: 'numeric',
                                                                                pattern: '[0-9]*'
                                                                            }}
                                                                            label="Price"
                                                                            variant="outlined"
                                                                            disabled={props.editData}
                                                                            size="small"
                                                                            value={val.price1 || 0}
                                                                            name="price1"
                                                                            onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                        />
                                                                    </div>
                                                                    <div className="w-[30%]">
                                                                        <TextField
                                                                            label="Price"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            disabled={props.editData}
                                                                            value={val.price2}
                                                                            name="price2"
                                                                            onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                        />
                                                                    </div>
                                                                    <div className="w-[30%]">
                                                                        <TextField
                                                                            label="Price"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            disabled={props.editData}
                                                                            name="price3"
                                                                            value={val.price3}
                                                                            onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </FormGroup>
                                                    </div>
                                                </Typography>
                                            </AccordionDetails>
                                        );
                                    })}
                                </Accordion>
                            </Grid>
                        ) : (
                            <></>
                        );
                    })
                ) : (
                    <></>
                )}
            </Grid>
        </MainCard>
    );
};

export default ProductForm;
