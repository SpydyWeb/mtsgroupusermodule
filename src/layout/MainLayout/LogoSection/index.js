import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={'/'}>
        <img src="https://www.mtsgrp.net/img/logo/logoorgv2.png" alt="Logo" style={{ width: '145px' }} />
    </ButtonBase>
);

export default LogoSection;
