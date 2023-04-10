import { Button, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Addvendoreoc } from 'servicesapi/Vendorapi';
const EandO = (props) => {
    const [formValue, setFormValue] = useState({
        per_claim_amount: '',
        policy_aggrigate: '',
        effectivedate: '',
        expirydate: '',
        policynumber: '',
        providerName: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    const handleEditSubmit = () => {
        Addvendoreoc(formValue).then((res) => {
            if (res.status === 200) {
                toast.success('E&O coverage policy added succsessfully');
                props.seteditModalOpen((prev) => !prev);
            } else {
                res.json().then((res) => toast.error(res));
            }
        });
    };

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
                        label={
                            <>
                                Per Claim Amount <span className="text-red-600">*</span>
                            </>
                        }
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
                        label={
                            <>
                                Policy Aggregate <span className="text-red-600">*</span>
                            </>
                        }
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
                        label={
                            <>
                                Effective Date <span className="text-red-600">*</span>
                            </>
                        }
                        type="date"
                        value={formValue.effectivedate}
                        name="effectivedate"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        focused
                        variant="outlined"
                        size="small"
                    />
                </div>

                <div>
                    <TextField
                        disabled={props.editData}
                        label={
                            <>
                                Expiry Date <span className="text-red-600">*</span>
                            </>
                        }
                        type="date"
                        value={formValue.expirydate}
                        name="expirydate"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        focused
                        variant="outlined"
                        size="small"
                    />
                </div>
                <div>
                    <TextField
                        disabled={props.editData}
                        label={
                            <>
                                Policy No <span className="text-red-600">*</span>
                            </>
                        }
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
                        label={
                            <>
                                Provider Name <span className="text-red-600">*</span>
                            </>
                        }
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
            <Box
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
            </Box>
        </SubCard>
    );
};

export default EandO;
