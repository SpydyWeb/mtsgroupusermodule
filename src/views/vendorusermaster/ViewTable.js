import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Box, IconButton, Stack, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import {
    getLicencedata,
    getCommunicationdata,
    deleteCommunicationdata,
    deleteLicencedata,
    getStatedata,
    deletestatedata
} from 'store/action/vendorAction';
import { useDispatch, useSelector } from 'react-redux';
import { HeadingName } from './columnField';
import { useLocation } from 'react-router';
import { IoMdAddCircle } from 'react-icons/io';
import PopupForm from './PopupForm';
import { setDialogueview } from 'store/action/actions';
import ConfirmDialoague from 'ui-component/DialogueBox/ConfirmDialoague';
import { getroledata, deleteroledata, getaccessroledata, deleteaccessroledata } from 'store/action/userAction';
const ViewTable = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [open, setopen] = useState('');
    const [editdata, seteditdata] = useState('');
    const [heading, SetHeading] = useState();
    const { VendorData, customization, UserRoleData } = useSelector((state) => state);

    useEffect(() => {
        if (customization.isOpen.includes('licencetype')) dispatch(getLicencedata());
        else if (customization.isOpen.includes('communicationtype')) dispatch(getCommunicationdata());
        else if (customization.isOpen.includes('state')) dispatch(getStatedata());
        else if (customization.isOpen.includes('role')) dispatch(getroledata());
        else if (customization.isOpen.includes('accessrole')) dispatch(getaccessroledata());
        SetHeading(...HeadingName.filter((id) => id.id === location.pathname.split('/')[2]));
    }, [customization.isOpen[0]]);
    const getColumnname = () => {
        let colname = [];
        heading?.TableColumn?.map((ele) =>
            colname.push({
                field: ele.id,
                headerName: ele.label,
                minWidth: ele.minWidth,
                flex: ele.flex,
                renderCell: ele.renderCell
                    ? (params) => {
                          return (
                              <Grid container spacing={2}>
                                  <Grid item>
                                      <IconButton size="small" sx={{ color: '#2196f3' }} onClick={() => handleOpenpopup(params)}>
                                          <AiFillEdit title="Edit" />
                                      </IconButton>
                                  </Grid>
                                  <Grid item>
                                      <IconButton size="small" sx={{ color: '#f31111' }} onClick={() => handleConfirmBox(params)}>
                                          <FaTrash title="Delete" />
                                      </IconButton>
                                  </Grid>
                              </Grid>
                          );
                      }
                    : null
            })
        );
        return colname;
    };
    const handleConfirmBox = (id) => {
        if (customization.isOpen.includes('licencetype')) id = id?.row?.Licence_id;
        else if (customization.isOpen.includes('state')) id = id?.row?.state_id;
        else if (customization.isOpen.includes('role')) id = id?.row?.name;
        else if (customization.isOpen.includes('accessrole')) id = id?.row?.subrole;
        else id = id?.row?.com_id;
        setopen(id);
    };
    const handleOpenpopup = (id) => {
        if (customization.isOpen.includes('licencetype')) id = id?.row?.Licence_id;
        else if (customization.isOpen.includes('state')) id = id?.row?.state_id;
        else if (customization.isOpen.includes('role')) id = id?.row?.name;
        else if (customization.isOpen.includes('accessrole')) id = id?.row?.subrole;
        else id = id?.row?.com_id;
        if (id !== '') {
            let data = '';
            if (customization.isOpen.includes('licencetype')) {
                for (let i = 0; i < VendorData.licenceTypeData.length; i++) {
                    if (VendorData.licenceTypeData[i].Licence_id === id) {
                        data = VendorData.licenceTypeData[i];
                        break;
                    }
                }
            } else if (customization.isOpen.includes('state')) {
                for (let i = 0; i < VendorData.stateData.length; i++) {
                    if (VendorData.stateData[i].state_id === id) {
                        data = VendorData.stateData[i];
                        break;
                    }
                }
            } else if (customization.isOpen.includes('role')) {
                for (let i = 0; i < UserRoleData.RoleData.length; i++) {
                    if (UserRoleData.RoleData[i].name === id) {
                        data = UserRoleData.RoleData[i];
                        break;
                    }
                }
            } else if (customization.isOpen.includes('accessrole')) {
                for (let i = 0; i < UserRoleData.AccessRoleData.length; i++) {
                    if (UserRoleData.AccessRoleData[i].subrole === id) {
                        data = UserRoleData.AccessRoleData[i];
                        break;
                    }
                }
            } else {
                for (let i = 0; i < VendorData.communicationTypeData.length; i++) {
                    if (VendorData.communicationTypeData[i].com_id === id) {
                        data = VendorData.communicationTypeData[i];
                        break;
                    }
                }
            }
            heading?.formfield?.map((ele) => {
                heading.initialValue[ele.name] = data[ele.name];
            });
            seteditdata(data);
        } else {
            heading?.formfield?.map((ele) => {
                heading.initialValue[ele.name] = '';
            });
        }
        let formtype = location.pathname.split('/')[2];
        dispatch(setDialogueview(formtype));
    };
    const handleConfirmDialogue = (type) => {
        if (type) {
            if (heading.id === 'licencetype') dispatch(deleteLicencedata(open));
            else if (heading.id === 'communicationtype') dispatch(deleteCommunicationdata(open));
            else if (heading.id === 'role') dispatch(deleteroledata(open));
            else if (heading.id === 'accessrole') dispatch(deleteaccessroledata(open));
            else dispatch(deletestatedata(open));
        }
        setopen('');
    };
    return (
        <MainCard
            title={
                <Grid container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid sx={{ fontSize: '30px' }}>{heading?.label}</Grid>
                    <Grid>
                        <IconButton sx={{ color: '#349164' }} onClick={() => handleOpenpopup('')}>
                            <IoMdAddCircle size={40} />
                        </IconButton>
                    </Grid>
                </Grid>
            }
        >
            {customization.dialogueview !== '' ? <PopupForm headingData={heading} editdata={editdata} /> : <></>}
            <ConfirmDialoague
                open={open === '' ? false : true}
                handleClick={(type) => handleConfirmDialogue(type)}
                msg="Do you really want to delete ?"
            />
            <Grid>
                <DataGrid
                    rows={
                        customization.isOpen.includes('licencetype')
                            ? VendorData.licenceTypeData
                            : customization.isOpen.includes('state')
                            ? VendorData.stateData
                            : customization.isOpen.includes('role')
                            ? UserRoleData.RoleData
                            : customization.isOpen.includes('accessrole')
                            ? UserRoleData.AccessRoleData
                            : VendorData.communicationTypeData
                    }
                    sx={{ height: '60vh' }}
                    columns={getColumnname()}
                    components={{ Toolbar: GridToolbar }}
                />
            </Grid>
        </MainCard>
    );
};

export default ViewTable;
