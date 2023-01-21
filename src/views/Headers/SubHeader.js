import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import TransDialoague from 'ui-component/DialogueBox/TransDialoague';
import './Header.css';
import Login from './login';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from './RegisterForm';
import { setDialogueview } from 'store/action/actions';
const SubHeader = () => {
    const dispatch = useDispatch();
    const { customization } = useSelector((state) => state);
    const Navigate = useNavigate();
    return (
        <>
            <div className="bg-blueGray-700 w-full">
                <div className="container px-4 mx-auto flex  items-center justify-between">
                    <div className="w-full md:w-1/2  flex flex-wrap md:justify-start justify-center items-center ">
                        <span className="text-9  inline-flex items-baseline text-white" style={{ fontSize: '13px' }}>
                            {' '}
                            <i class="fas fa-envelope mr-1"></i>info@mtsgrp.net
                        </span>
                        <span className="text-white px-2">|</span>
                        <span className="text-sm  inline-flex items-baseline text-white" style={{ fontSize: '13px' }}>
                            <i class="fas fa-phone-alt mr-1"></i>(412) 345-5199
                        </span>
                    </div>
                    <div
                        className="md:w-1/2 w-full flex md:justify-end justify-center items-center py-1 space-x-2"
                        style={{ fontSize: '13px', gap: '10px' }}
                    >
                        <button
                            className="Rbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                                dispatch(setDialogueview('register'));
                            }}
                        >
                            <span class="text">
                                <i class="fas fa-user-plus mr-1 "></i>Register
                            </span>
                        </button>
                        <button
                            className="Rbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                                dispatch(setDialogueview('login'));
                            }}
                        >
                            <span class="text">
                                <i class="fas fa-user-lock mr-1"></i>Login
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <TransDialoague>
                {customization.dialogueview === 'register' ? <RegisterForm /> : customization.dialogueview === 'login' ? <Login /> : ''}
            </TransDialoague>
        </>
    );
};

export default SubHeader;
