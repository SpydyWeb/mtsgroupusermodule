import React, { useEffect, useState } from 'react';
import TransDialoague from 'ui-component/DialogueBox/TransDialoague';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogueview } from 'store/action/actions';
import { useFormik } from 'formik';
import { addLicencedata, addCommunicationdata, addStatedata } from 'store/action/vendorAction';
import { addroledata, addaccessroledata } from 'store/action/userAction';
import Registration from 'views/Headers/Register';
const UserRegPropup = (props) => {
    const [headingData, setHeadingdata] = useState(props.headingData);
    const dispatch = useDispatch();

    return (
        <TransDialoague maxWidth={'md'} fullWidth={true}>
            <>
                <Registration />
            </>
        </TransDialoague>
    );
};

export default UserRegPropup;
