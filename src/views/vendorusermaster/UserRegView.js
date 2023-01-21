import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Box, IconButton, Stack, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { HeadingName } from './columnField';
import { useLocation } from 'react-router';
import { IoMdAddCircle } from 'react-icons/io';
import UserRegPropup from './UserRegPropup';
import { setDialogueview } from 'store/action/actions';
import ConfirmDialoague from 'ui-component/DialogueBox/ConfirmDialoague';
import { getalluserdata } from 'store/action/userAction';
const UserRegView = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [open, setopen] = useState('');
    const [heading, SetHeading] = useState();
    const { VendorData, customization, UserRoleData } = useSelector((state) => state);
    useEffect(() => {
        dispatch(getalluserdata());
        SetHeading(...HeadingName.filter((id) => id.id === location.pathname.split('/')[2]));
    }, []);
    const getColumnname = () => {
        let colname = [];
        heading?.TableColumn?.map((ele) =>
            colname.push({
                field: ele.id,
                headerName: ele.label,
                minWidth: ele.minWidth,
                flex: ele?.flex,
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
    const handleOpenpopup = (id) => {
        let formtype = location.pathname.split('/')[2];
        dispatch(setDialogueview(formtype));
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
            {customization.dialogueview !== '' ? <UserRegPropup headingData={heading} /> : <></>}
            <ConfirmDialoague
                open={open === '' ? false : true}
                handleClick={(type) => handleConfirmDialogue(type)}
                msg="Do you really want to delete ?"
            />
            <Grid>
                <DataGrid
                    rows={UserRoleData.UserData}
                    sx={{ height: '60vh' }}
                    columns={getColumnname()}
                    components={{ Toolbar: GridToolbar }}
                />
            </Grid>
        </MainCard>
    );
};

export default UserRegView;
