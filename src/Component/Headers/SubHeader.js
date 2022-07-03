import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Header.css";
import Login from "./login";
//import RegisterTitle from "../RegisterTitle";
import RegisterForm from "./RegisterForm";
const SubHeader = () => {
  const [modalView, setModalView] = useState("");
  const Navigate = useNavigate();
  return (
    <>
      <div className="bg-blueGray-700 w-full">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2  flex flex-wrap md:justify-start justify-center items-center ">
            <span
              className="text-9  inline-flex items-baseline text-white"
              style={{ fontSize: "13px" }}
            >
              {" "}
              <i class="fas fa-envelope mr-1"></i>info@mtsgrp.net
            </span>
            <span className="text-white px-2">|</span>
            <span
              className="text-sm  inline-flex items-baseline text-white"
              style={{ fontSize: "13px" }}
            >
              <i class="fas fa-phone-alt mr-1"></i>(412) 345-5199
            </span>
          </div>
          <div
            className="md:w-1/2 w-full flex md:justify-end justify-center items-center py-1 space-x-2"
            style={{ fontSize: "13px" }}
          >
            {/* <span
              className=" font-semibold text-white Btn_Gradient uppercase rounded-sm px-2 cursor-pointer mr-3 inline-flex items-baseline justify-center"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ fontSize: "14px" }}
              onClick={() => {
                setModalView(0);
              }}
            >
              <span>
                <i class="fas fa-user-plus mr-1 "></i>Register
              </span>
            </span> */}
            <button
              className="Rbtn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => {
                setModalView(0);
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
                setModalView(1);
              }}
            >
              <span class="text">
                <i class="fas fa-user-lock mr-1"></i>Login
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 
MODAL */}

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          className={
            modalView === 0
              ? "modal-dialog modal-lg"
              : "modal-dialog LogModalWidth"
          }
        >
          <div class="modal-content">
            <div
              class={
                modalView === 0
                  ? "modal-body ModalBackground p-1 rounded-lg"
                  : "modal-body ModalBackground p-1 rounded-lg"
              }
            >
              {modalView === 0 ? <RegisterForm /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
