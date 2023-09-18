import { Button, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Addvendoreoc, GetVendorEandOById, UpdateVendorEandO } from 'servicesapi/Vendorapi';
import { toast } from 'react-hot-toast';
const EandO = (props) => {
    const { formValue, handleChange } = props;

    return (
        <SubCard title="E&O Coverage Policy" sx={{ mb: 2 }} className={'block'}>
            <div
                // style={{ marginBottom: '20px', paddingTop: '20px' }}
                className={`flex flex-col md:flex-row gap-6`}
            >
                <div>
                    <TextField
                        disabled={props.editData}
                        id="Id"
                        label={<>Per Claim Amount</>}
                        value={formValue.per_claim_amount}
                        name={'per_claim_amount'}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        variant="outlined"
                        size="small"
                    />
                </div>
                <div>
                    <TextField
                        disabled={props.editData}
                        label={<>Policy Aggregate</>}
                        value={formValue.policy_aggrigate}
                        name="policy_aggrigate"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        variant="outlined"
                        size="small"
                    />
                </div>

                <div>
                    <TextField
                        disabled={props.editData}
                        label={<>Effective Date</>}
                        type="date"
                        value={formValue.effectivedate?.split('T')[0]}
                        name="effectivedate"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        focused={true}
                        variant="outlined"
                        size="small"
                    />
                </div>

                <div>
                    <TextField
                        disabled={props.editData}
                        label={<>Expiry Date</>}
                        type="date"
                        value={formValue.expirydate?.split('T')[0]}
                        name="expirydate"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        focused={true}
                        variant="outlined"
                        size="small"
                        onBlur={(e) => {
                            let data = formValue.expirydate;
                            if (
                                new Date(e.target.value) > new Date(formValue.effectivedate) &&
                                new Date(e.target.value) < new Date('01-01-3000')
                            ) {
                                data = e.target.value;
                            } else {
                                toast.error('Expiry date should be greater than issue date');
                                data = '';
                            }

                            setFormValue({
                                ...formValue,
                                ['expirydate']: data
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        disabled={props.editData}
                        label={<>Policy No</>}
                        value={formValue.policynumber}
                        name="policynumber"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        variant="outlined"
                        size="small"
                    />
                </div>
                <div>
                    <TextField
                        disabled={props.editData}
                        label={<>Provider Name</>}
                        value={formValue.providerName}
                        name="providerName"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        variant="outlined"
                        size="small"
                    />
                </div>
            </div>
            {/* <Box
                sx={{
                    display: props.edit ? 'flex' : 'none',
                    flexDirection: 'row',
                    pt: 2,
                    justifyContent: 'end'
                }}
            >
                {props.edit ? (
                    <Button onClick={() => props.setOpenTableView(!props.openTableView)} variant="outlined" color="info" sx={{ m: 1 }}>
                        Back
                    </Button>
                ) : (
                    ''
                )}

                <Button onClick={() => handleEditSubmit()} variant="contained" sx={{ m: 1, display: 'block' }}>
                    Submit
                </Button>
            </Box> */}
        </SubCard>
    );
};

export default EandO;
