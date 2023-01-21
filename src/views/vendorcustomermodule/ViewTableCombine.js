import React from 'react';
import ViewTable from './ViewTable';
import ViewTabs from './ViewTabs';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector } from 'react-redux';
import { StepperForm } from './StepperForm';
const ViewTableCombine = () => {
    const { customization } = useSelector((state) => state);
    return (
        <MainCard>
            <ViewTabs>{customization.tabview === 'View' ? <ViewTable /> : <StepperForm />}</ViewTabs>
        </MainCard>
    );
};

export default ViewTableCombine;
