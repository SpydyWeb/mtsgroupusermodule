import React, { useState } from 'react';
import data from './dbAuten.json';
import TextBox from '../InputFields/TextBox';
import { Box } from '@mui/material';
import DropDownBox from '../InputFields/DropDownBox';
import toast from 'react-hot-toast';
import ToolTipValidation from '../Validation/ToolTipValidation';
import { CheckvalidatePassword, CheckvalidEmail } from './PasswordValid';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import PasswordValidateMessage from './PasswordValidateMessage';
import { UserRegistration } from 'servicesapi/Userapi';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogueview } from 'store/action/actions';
const Registration = () => {
    const dispatch = useDispatch();
    const [passwordValid, setPasswordValid] = useState({
        length: false,
        uppercase: false,
        number: false,
        specailchar: false
    });
    const [UserData, setUserData] = useState({
        userType: '',
        firstName: '',
        lastName: '',
        emailId: '',
        logId: '',
        password: '',
        outEmail: '',
        cellPhone: '',
        allowTextMsg: false,
        manager: '',
        department: '',
        workStartH: 0,
        workStartM: 0,
        workEndH: 0,
        workEndM: 0,
        emailSignature: ''
    });
    const [WorkSt, setWorkSt] = useState({ Hour: '', Minute: '', type: '' });
    const [WorkEt, setWorkEt] = useState({ Hour: '', Minute: '', type: '' });
    const [Cpassword, setCpassword] = useState('');
    const [tooltip, setTooltip] = useState({
        isShow: false,
        Valid: ''
    });
    const onChangeHandle = (evt) => {
        if (evt.target.name === 'password') {
            setPasswordValid(CheckvalidatePassword(evt.target.value, passwordValid));
            isPasswordMview();
        }
        if (evt.target.name === 'emailId') {
            setTooltip({
                Valid: CheckvalidEmail(evt.target.value),
                isShow: true
            });
        }
        setUserData({ ...UserData, [evt.target.name]: evt.target.value });
    };
    const onChangeStartTime = (evt) => {
        if (evt.target.name === 'type') {
            if (evt.target.value === 'PM') {
                setUserData({
                    ...UserData,
                    workStartH: parseInt(WorkSt.Hour) + 12
                });
            } else {
                setUserData({
                    ...UserData,
                    workStartH: WorkSt.Hour
                });
            }
            if (evt.target.name === 'Hour') {
                setUserData({ ...UserData, workStartH: evt.target.value });
            }
        }
        if (evt.target.name === 'Minute')
            setUserData({
                ...UserData,
                workStartM: parseInt(evt.target.value)
            });

        setWorkSt({ ...WorkSt, [evt.target.name]: evt.target.value });
    };
    const onChangeEndTime = (evt) => {
        if (evt.target.name === 'type') {
            if (evt.target.value === 'PM') {
                setUserData({ ...UserData, workEndH: parseInt(WorkEt.Hour) + 12 });
            } else setUserData({ ...UserData, workEndH: parseInt(WorkEt.Hour) });
        }
        if (evt.target.name === 'Hour') {
            setUserData({ ...UserData, workEndH: evt.target.value });
        }
        if (evt.target.name === 'Minute')
            setUserData({
                ...UserData,
                workEndM: parseInt(evt.target.value)
            });
        setWorkEt({ ...WorkEt, [evt.target.name]: evt.target.value });
        // setUserData({
        //   ...UserData,
        //   workEndT: WorkEt,
        // });
    };
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        Cpassword: false
    });
    const [ispasswordmessage, setisPasswordMessage] = useState(true);
    const onDataSave = () => {
        if (
            UserData.firstName === '' ||
            UserData.lastName === '' ||
            UserData.emailId === '' ||
            UserData.logId === '' ||
            UserData.manager === '' ||
            UserData.department === '' ||
            Cpassword === ''
        )
            toast.error('Please enter all mandatory fields');
        else {
            UserRegistration(UserData).then((res) => {
                if (res.status === 200) {
                    dispatch(setDialogueview(''));
                    toast.success('User Registered Successfully');
                    document.getElementById('closePopup').click();
                    ResetData();
                }
            });
        }
    };

    const ResetData = () => {
        setUserData({
            userType: '',
            firstName: '',
            lastName: '',
            emailId: '',
            logId: '',
            password: '',
            outEmail: '',
            cellPhone: '',
            allowTextMsg: false,
            manager: '',
            department: '',
            workStartH: 0,
            workStartM: 0,
            workEndH: 0,
            workEndM: 0,
            emailSignature: ''
        });
        setCpassword('');
    };
    const isPasswordMview = () => {
        if (passwordValid.length && passwordValid.number && passwordValid.specailchar && passwordValid.uppercase) {
            setisPasswordMessage(true);
        } else {
            setisPasswordMessage(false);
        }
    };
    return (
        <>
            <div style={{}}>
                <div className="md:border-r-2 border-0">
                    <div className="flex gap-2 mb-3  md:flex-row flex-column">
                        <DropDownBox
                            lable={'User Type'}
                            ddldata={data.userType}
                            placeHolder={'Select user type'}
                            onChangeHandle={onChangeHandle}
                            name={'userType'}
                            value={UserData.userType}
                            isMandatory={true}
                        />
                        <div className="w-full">
                            <DropDownBox
                                lable={'Manager'}
                                ddldata={data.manager}
                                placeHolder={'--Select--'}
                                onChangeHandle={onChangeHandle}
                                name={'manager'}
                                value={UserData.manager}
                                isMandatory={true}
                            />
                        </div>
                        <div className="w-full">
                            <DropDownBox
                                lable={'Department'}
                                ddldata={data.department}
                                placeHolder={'--Select--'}
                                onChangeHandle={onChangeHandle}
                                name={'department'}
                                value={UserData.department}
                                isMandatory={true}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 mb-3  md:flex-row flex-column">
                        <TextBox
                            lable={'First Name'}
                            placeHolder="Enter fist name"
                            name="firstName"
                            value={UserData.firstName}
                            onChangeHandle={onChangeHandle}
                            isMandatory={true}
                        />
                        <TextBox
                            lable={'Last Name'}
                            placeHolder="Enter last name"
                            name="lastName"
                            value={UserData.lastName}
                            onChangeHandle={onChangeHandle}
                            isMandatory={true}
                        />
                        <div className="w-full">
                            <TextBox
                                lable={'Email Id'}
                                placeHolder="Enter email id"
                                name="emailId"
                                value={UserData.emailId}
                                onChangeHandle={onChangeHandle}
                                isMandatory={true}
                                onBlur={() => setTooltip({ ...tooltip, isShow: false })}
                                onFocus={(evt) => {
                                    setTooltip({
                                        Valid: CheckvalidEmail(evt.target.value),
                                        isShow: true
                                    });
                                }}
                            />
                            {tooltip.isShow ? (
                                <ToolTipValidation
                                    isValid={tooltip.Valid}
                                    validMessage="Correct"
                                    invalidMessage={'Please enter valid email id '}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 mb-3  md:flex-row flex-column">
                        <TextBox
                            lable={'Login Id'}
                            placeHolder="Enter login Id"
                            name="logId"
                            value={UserData.logId}
                            onChangeHandle={onChangeHandle}
                            isMandatory={true}
                        />
                        <div style={{ width: '100%' }}>
                            <div className="text-sm font-semibold text-gray-500">
                                Password
                                <span className={`text-red-600 `}>*</span>
                            </div>
                            <div className="relative">
                                <input
                                    type={passwordVisibility.password ? 'text' : 'password'}
                                    placeholder={'Enter password'}
                                    onChange={(e) => onChangeHandle(e)}
                                    value={UserData.password}
                                    onFocus={isPasswordMview}
                                    onBlur={isPasswordMview}
                                    name="password"
                                    style={{ width: '100%', paddingLeft: '5px' }}
                                    className="form-control px- py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none bg-sky-100 focus:ring-4 focus:ring-blue-200"
                                />

                                <Box
                                    className="input-group-text cursor-pointer absolute"
                                    sx={{ right: '5px', top: '35%' }}
                                    onClick={() =>
                                        setPasswordVisibility({
                                            ...passwordVisibility,
                                            password: !passwordVisibility.password
                                        })
                                    }
                                >
                                    {passwordVisibility.password ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </Box>
                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            <div className="text-sm font-semibold text-gray-500">
                                Confirm Password
                                <span className={`text-red-600 `}>*</span>
                            </div>
                            <div className="relative">
                                <input
                                    type={passwordVisibility.Cpassword ? 'text' : 'password'}
                                    placeholder={'Enter confirm password'}
                                    value={Cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                    onBlur={() => {
                                        if (UserData.password !== Cpassword) {
                                            setCpassword('');
                                            toast.error('Password and confirm passwrod should be the same');
                                        }
                                    }}
                                    style={{ width: '100%', paddingLeft: '5px' }}
                                    className="form-control px- py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none bg-sky-100 focus:ring-4 focus:ring-blue-200"
                                />

                                <Box
                                    className="input-group-text cursor-pointer absolute"
                                    sx={{ right: '5px', top: '35%' }}
                                    onClick={() =>
                                        setPasswordVisibility({
                                            ...passwordVisibility,
                                            Cpassword: !passwordVisibility.Cpassword
                                        })
                                    }
                                >
                                    {passwordVisibility.Cpassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </Box>
                            </div>
                        </div>
                    </div>
                    <PasswordValidateMessage isView={ispasswordmessage} passwordValid={passwordValid} />
                    <div className="flex gap-2 mb-3  md:flex-row flex-column">
                        {' '}
                        <TextBox
                            lable={'Out Email'}
                            placeHolder="Enter out email"
                            name="outEmail"
                            value={UserData.outEmail}
                            onChangeHandle={onChangeHandle}
                        />
                        <TextBox
                            lable={'Cell Phone'}
                            placeHolder="Enter cell phone"
                            name="cellPhone"
                            value={UserData.cellPhone}
                            onChangeHandle={onChangeHandle}
                        />
                    </div>

                    {/* <div className="flex ">
              <div className="text-sm font-semibold text-gray-500 w-1/2">
               
              </div>
              <div className="text-sm font-semibold text-gray-500 w-1/2">
              
              </div>
            </div> */}
                    <div className="flex gap-2 mb-3 md:flex-row flex-column ">
                        <div className=" gap-2  md:w-1/2 w-full flex-column ">
                            <div className="w-full text-gray-500"> Work Start Time</div>
                            <div className="flex gap-1">
                                <DropDownBox
                                    ddldata={data.hours}
                                    placeHolder={'Hours'}
                                    onChangeHandle={onChangeStartTime}
                                    name={'Hour'}
                                    value={WorkSt.Hour}
                                />
                                <DropDownBox
                                    ddldata={data.minutes}
                                    placeHolder={'Min'}
                                    onChangeHandle={onChangeStartTime}
                                    name={'Minute'}
                                    value={WorkSt.Minute}
                                />
                                <DropDownBox
                                    ddldata={data.TimeType}
                                    placeHolder={'AM/PM'}
                                    onChangeHandle={onChangeStartTime}
                                    name={'type'}
                                    value={WorkSt.type}
                                />
                            </div>
                        </div>

                        <div className=" gap-2 md:w-1/2 w-full flex-column ">
                            <div className="w-full text-gray-500"> Work End Time</div>

                            <div className="flex gap-1">
                                <DropDownBox
                                    ddldata={data.hours}
                                    placeHolder={'Hours'}
                                    onChangeHandle={onChangeEndTime}
                                    name={'Hour'}
                                    value={WorkEt.Hour}
                                />
                                <DropDownBox
                                    ddldata={data.minutes}
                                    placeHolder={'Min'}
                                    onChangeHandle={onChangeEndTime}
                                    name={'Minute'}
                                    value={WorkEt.Minute}
                                />
                                <DropDownBox
                                    ddldata={data.TimeType}
                                    placeHolder={'AM/PM'}
                                    onChangeHandle={onChangeEndTime}
                                    name={'type'}
                                    value={WorkEt.type}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3" style={{ marginTop: '1px' }}>
                <div className="text-gray-500">Email Signature</div>
                <textarea
                    rows={3}
                    value={UserData.emailSignature}
                    name="emailSignature"
                    onChange={(evt) => onChangeHandle(evt)}
                    className="px-4 py-2 w-full transition duration-300 bg-sky-100 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                ></textarea>
            </div>
            <div className="flex" style={{ marginTop: '1px' }}>
                <input
                    type={'checkbox'}
                    value={UserData.allowTextMsg}
                    name={'allowTextMsg'}
                    onChange={(evt) => {
                        setUserData({ ...UserData, allowTextMsg: !UserData.allowTextMsg });
                    }}
                    className="py-2 transition duration-300 shadow-2xl  border-2 border-sky-400 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 "
                />
                <div className="text-sm font-semibold text-gray-500 ml-1">Allow Text Message</div>
            </div>
            <div className="flex justify-end gap-3">
                <button onClick={ResetData} className="btn-donate btn-warning">
                    Reset
                </button>
                <button onClick={onDataSave} className="btn-donate">
                    Save
                </button>
            </div>
        </>
    );
};

export default Registration;
