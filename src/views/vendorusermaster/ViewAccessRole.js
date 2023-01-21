import React, { useEffect, useState } from 'react';
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Footer from './Footer';
import { GetMappingsubRole, Deletemapping } from '../../servicesapi/Userroleapi';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai';
import toast from 'react-hot-toast';
import EditAccessrolepopup from './EditAccessrolepopup';
import { Chip, Accordion, Button, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { FcExpand } from 'react-icons/fc';
import TransDialoague from 'ui-component/DialogueBox/TransDialoague';
import { useDispatch } from 'react-redux';
import { setDialogueview } from 'store/action/actions';
const ViewAccessRole = () => {
    const [accessData, setAccessData] = useState([]);
    const dispatch = useDispatch();
    const [accessrole, setaccessrole] = useState({
        role: [],
        subroles: []
    });
    const Navigate = useNavigate();
    useEffect(() => {
        GetMappingsubRole().then((res) => {
            setAccessData(res);
        });
    }, []);
    const onDeletehandler = (rolname, subrole) => {
        if (window.confirm('Do you want to delete the access control?')) {
            Deletemapping({
                role: rolname,
                subrole: subrole
            }).then((res) => {
                if (res.status === 200) {
                    toast.success('role deleted successfully');
                    setInterval(() => {
                        window.location.reload();
                    }, 1000);
                }
            });
        }
    };

    return (
        <MainCard>
            <div className="content-wrapper px-4">
                <div classname="container ">
                    {' '}
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <button
                            type="button"
                            style={{ background: '#349164', padding: '5px', color: 'white' }}
                            onClick={() => Navigate('/admin/accessroledefinition')}
                        >
                            Add
                        </button>
                    </div>
                    <div className="accordion" id="accordionExample">
                        {accessData.length > 0
                            ? accessData.map((val) => {
                                  return (
                                      <Accordion className="max-h-[250px] overflow-y-auto">
                                          <AccordionSummary
                                              expandIcon={<FcExpand />}
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                              style={{
                                                  borderBottom: '1px solid lightgray'
                                              }}
                                          >
                                              <Box style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                  <Typography style={{ fontWeight: '700' }}>{val.name}</Typography>
                                                  <AiFillEdit
                                                      style={{ color: '#2196f3', marginRight: '15px' }}
                                                      title="Edit"
                                                      onClick={() => {
                                                          let data = accessrole.role;
                                                          data.pop();
                                                          data.push(val.name);
                                                          let subdata = accessData.filter((ele) => {
                                                              return ele.name === val.name;
                                                          });
                                                          let subrolesdata = [];
                                                          subdata[0].subroles.map((ele) => subrolesdata.push(ele.name));
                                                          setaccessrole({
                                                              subroles: subrolesdata,
                                                              role: data
                                                          });
                                                          dispatch(setDialogueview('accessrolel'));
                                                      }}
                                                  />
                                              </Box>
                                          </AccordionSummary>

                                          <AccordionDetails>
                                              <Typography>
                                                  <div
                                                      id={`collapse${val.id}`}
                                                      className="accordion-collapse collapse"
                                                      aria-labelledby={`heading${val.id}`}
                                                      data-bs-parent="#accordionExample"
                                                  >
                                                      <div className="accordion-body p-4">
                                                          {val.subroles.length > 0
                                                              ? val.subroles.map((subVal) => {
                                                                    return (
                                                                        <>
                                                                            <Chip
                                                                                label={subVal.name}
                                                                                variant="outlined"
                                                                                onDelete={() => onDeletehandler(val.name, subVal.name)}
                                                                            />
                                                                        </>
                                                                    );
                                                                })
                                                              : ''}
                                                      </div>
                                                  </div>
                                              </Typography>
                                          </AccordionDetails>
                                      </Accordion>
                                  );
                              })
                            : ''}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
            <TransDialoague>
                <div class="modal-content">
                    <div class={'modal-body bg-white  p-1 rounded-lg'}>
                        {accessrole.role.length !== 0 ? <EditAccessrolepopup data={accessrole} /> : <></>}
                    </div>
                </div>
            </TransDialoague>
        </MainCard>
    );
};

export default ViewAccessRole;
