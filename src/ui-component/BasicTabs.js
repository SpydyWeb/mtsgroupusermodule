import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Grid } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Grid role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Grid>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function BasicTabs(props) {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '8px' }}>
                <Tabs value={props.value} onChange={props.handleChange} aria-label="basic tabs example">
                    {props.ViewLabel.map((ele, i) => (
                        <Tab label={ele.label} value={ele.label} {...a11yProps(i)} />
                    ))}
                </Tabs>
            </Box>
            {props.children}
        </Box>
    );
}
