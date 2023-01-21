import React from 'react';
import { Grid, Link, TextField, Select, InputLabel, FormControl, MenuItem, Button, Box } from '@mui/material';
import { StepperForm } from './utilities';
import SubCard from 'ui-component/cards/SubCard';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
const ProfileForm = (props) => {
    const { customization, VendorData } = useSelector((state) => state);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: headingData.initialValue,
        validationSchema: headingData.schema,
        onSubmit: (values, action) => {
            if (headingData.id === 'licencetype') dispatch(addLicencedata({ formData: values, editid: props.editdata?.Licence_id }));
            else if (headingData.id === 'communicationtype')
                dispatch(addCommunicationdata({ formData: values, editid: props.editdata?.com_id }));
            else if (headingData.id === 'role') dispatch(addroledata({ formData: values, editid: props.editdata }));
            else if (headingData.id === 'accessrole') dispatch(addaccessroledata({ formData: values, editid: props.editdata }));
            else dispatch(addStatedata({ formData: values, editid: props.editdata?.state_id }));
        }
    });
    return (
        <Grid>
            <form onSubmit={handleSubmit}>
                {StepperForm.Profileformfield.map((ele) => {
                    return (
                        <>
                            {ele?.label ? <Box className="legend Btn_Gradient">{ele.label}</Box> : ''}
                            <SubCard sx={{ marginBottom: '20px', borderColor: '#a4d8fe' }}>
                                <Grid container spacing={1}>
                                    {ele.children.map((val) => {
                                        return (
                                            <Grid item xs={val?.multiline ? 12 : ''}>
                                                {val.type === 'textbox' ? (
                                                    <TextField
                                                        error={Boolean(touched[val.name] && errors[val.name])}
                                                        helperText={touched[val.name] && errors[val.name]}
                                                        label={
                                                            <Box sx={{ display: 'flex' }}>
                                                                {val.label}
                                                                {val.required ? <Box sx={{ color: 'red' }}>&nbsp;*</Box> : ''}
                                                            </Box>
                                                        }
                                                        name={val.name}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        sx={{ minWidth: val?.minWidth }}
                                                        multiline={val?.multiline}
                                                        rows={4}
                                                        value={
                                                            ele.name === ''
                                                                ? VendorData.ProfileFormData[val?.value]
                                                                : VendorData.ProfileFormData[ele.name][val?.value]
                                                        }
                                                    />
                                                ) : (
                                                    <FormControl size="small" sx={{ minWidth: val.minWidth }}>
                                                        <InputLabel>
                                                            <Box sx={{ display: 'flex' }}>
                                                                {val.label}
                                                                {val.required ? <Box sx={{ color: 'red' }}>&nbsp;*</Box> : ''}
                                                            </Box>
                                                        </InputLabel>
                                                        <Select name={val.name}>
                                                            {/* {props.allstate.map((ele, indx) => {
                                                            return <MenuItem value={ele.name}>{ele.name}</MenuItem>;
                                                        })} */}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </SubCard>
                        </>
                    );
                })}
            </form>
        </Grid>
    );
};

export default ProfileForm;
