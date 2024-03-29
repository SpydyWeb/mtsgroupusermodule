import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Box } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { UserLogin } from 'servicesapi/Userapi';
// import { UserLogin } from "../../Services/User";
export default function Login() {
    const navigate = useNavigate();
    const [LogOp, setLogOp] = useState(1);
    const [LogData, setLogData] = useState({
        username: '',
        password: '',
        rememberme: true
    });

    // LOGHANDLER
    const Loghandler = (e) => {
        setLogData({ ...LogData, [e.target.name]: e.target.value });
    };

    // LOGSUBMIT
    const LogSubmit = (e) => {
        e.preventDefault();
        if (e.target.id === 'logIn') {
            if (LogData.password === '' || LogData.username === '') {
                toast.error('Please enter login credential');
            } else {
                UserLogin(LogData).then((res) => {
                    if (res.status === 200) {
                        res.json().then((r) => localStorage.setItem('jwtTokenId', r));
                        localStorage.setItem('EmailId', LogData.username);
                        document.getElementById('closePopup').click();
                        Navigate('/admin/dashboard');
                    } else {
                        toast.error('Username or Password is incorrect');
                    }
                });
            }
        } else {
            const { email } = LogData;
            if (email === '') {
                toast.error('Please enter Email and Password');
            }
        }
        // document.getElementsByClassName("modal-backdrop").style.display = "none";
        // const { email, password } = LogData;

        // if (email === "" && password === "") {
        //   toast.error("Please enter Email and Password");
        // }
    };
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const Navigate = useNavigate();
    return (
        <div classname="container">
            <div className="flex justify-center items-center">
                <div className="flex flex-col overflow-hidden  rounded-md  max md:flex-row md:flex-1 lg:max-w-screen-md">
                    <div className="bg-white w-full ">
                        <div className="text-center">
                            <i class="fas fa-user-circle" style={{ fontSize: '100px' }}></i>
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-gray-700 text-center">
                            {LogOp === 1 ? 'MTS Group' : 'Password Recovery'}
                        </h3>
                        <form className="flex flex-col space-y-5 px-4" style={{ width: '280px' }}>
                            <div className="flex flex-col mb-1">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-500">
                                    User Name
                                </label>
                                <input
                                    value={LogData.username}
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={Loghandler}
                                    autofocus
                                    className="px-4 py-2 bg-sky-100 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>
                            <div className={LogOp === 1 ? 'flex flex-col' : 'delay-75 hidden'} style={{ marginTop: '10px' }}>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-semibold text-gray-500">
                                        Password
                                    </label>
                                    <button
                                        className="text-sm text-blueGray-500 hover:underline focus:text-blue-800 cursor-pointer"
                                        onClick={() => setLogOp(2)}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        value={LogData.password}
                                        type={passwordVisibility ? 'text' : 'password'}
                                        id="password"
                                        style={{ width: '100%' }}
                                        onChange={Loghandler}
                                        name="password"
                                        className="px-4 py-2 bg-sky-100  transition duration-300 border w-[88%] border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                    />
                                    <Box
                                        className="input-group-text cursor-pointer absolute"
                                        sx={{ right: '5px', top: '35%' }}
                                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                                    >
                                        {passwordVisibility ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </Box>
                                </div>
                            </div>
                            {LogOp === 1 ? (
                                <div className="flex items-center" style={{ marginTop: '2px' }}>
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        defaultChecked={LogData.rememberme}
                                        onClick={(e) => {
                                            setLogData({
                                                ...LogData,
                                                rememberme: !LogData.rememberme
                                            });
                                        }}
                                        className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                                    />
                                    <label htmlFor="remember" className="text-sm font-semibold text-gray-500 ml-2 mt-1">
                                        Remember me
                                    </label>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <button
                                        htmlFor="remember"
                                        className="text-sm font-semibold text-gray-500 ml-2 mt-1 cursor-pointer"
                                        onClick={() => setLogOp(1)}
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            )}
                            <div style={{ marginTop: '2px' }}>
                                <button
                                    onClick={LogSubmit}
                                    type="submit"
                                    className="btn-donate w-full mb-4 bg-[#0d6efd]"
                                    id={LogOp === 1 ? 'logIn' : 'Reset'}
                                >
                                    {LogOp === 1 ? 'Login' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
