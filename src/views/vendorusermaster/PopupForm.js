import React, { useEffect, useState } from 'react';
import TransDialoague from 'ui-component/DialogueBox/TransDialoague';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogueview } from 'store/action/actions';
import { useFormik } from 'formik';
import { addLicencedata, addCommunicationdata, addStatedata } from 'store/action/vendorAction';
import { addroledata, addaccessroledata } from 'store/action/userAction';
const PopupForm = (props) => {
    const [headingData, setHeadingdata] = useState(props.headingData);
    const dispatch = useDispatch();
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
        <TransDialoague>
            <MainCard>
                <form onSubmit={handleSubmit}>
                    {headingData?.formfield?.map((ele) => {
                        return (
                            <>
                                <TextField
                                    id={ele.name}
                                    label={
                                        <Box sx={{ display: 'flex' }}>
                                            {ele.label}
                                            {ele.required ? <Box sx={{ color: 'red' }}>&nbsp;*</Box> : ''}
                                        </Box>
                                    }
                                    variant="outlined"
                                    fullWidth={true}
                                    sx={{ width: '300px', marginTop: '10px' }}
                                    name={ele.name}
                                    value={values[ele.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Box sx={{ color: 'red' }}>{errors[ele.name] && touched[ele.name] ? errors[ele.name] : ''}</Box>
                            </>
                        );
                    })}
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px', gap: '10px' }}>
                        <Button sx={{ background: 'gray' }} color="error" variant="contained" onClick={() => dispatch(setDialogueview(''))}>
                            Cancel
                        </Button>
                        <Button sx={{ background: '#349164' }} variant="contained" type="submit">
                            Save
                        </Button>
                    </Box>
                </form>
            </MainCard>
        </TransDialoague>
    );
};

export default PopupForm;
