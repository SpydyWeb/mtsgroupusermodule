import React from 'react';
import BasicTabs from 'ui-component/BasicTabs';
import { useSelector, useDispatch } from 'react-redux';
import { setTabview } from 'store/action/actions';

const ViewTabs = ({ children }) => {
    const dispatch = useDispatch();
    const { customization } = useSelector((state) => state);
    const ViewLabel = [{ label: 'View' }, { label: 'New' }];
    const handleChange = (event, newValue) => {
        dispatch(setTabview(newValue));
    };

    return (
        <BasicTabs ViewLabel={ViewLabel} value={customization.tabview} handleChange={(event, newValue) => handleChange(event, newValue)}>
            {children}
        </BasicTabs>
    );
};

export default ViewTabs;
