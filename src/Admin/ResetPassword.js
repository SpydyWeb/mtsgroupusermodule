import React, { useState } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

import Footer from "./Footer";
import { UserLogin, ChangePassword } from "../Services/User";
import ToolTipValidation from "../Component/Validation/ToolTipValidation";
import PasswordValidateMessage from "../Component/Headers/PasswordValidateMessage";
import { CheckvalidatePassword } from "../Component/Headers/PasswordValid";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    number: false,
    specailchar: false,
  });
  const [ResetData, setResetData] = useState({
    email: localStorage.getItem("EmailId"),
    password: "",
  });
  const [tooltip, setTooltip] = useState({
    isShow: false,
    Valid: false,
  });
  const [oldPassword, setOldPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const onChangeOldpassword = (evt) => {
    setOldPassword(evt.target.value);

    UserLogin({
      username: ResetData.email,
      password: evt.target.value,
      rememberme: true,
    }).then((res) => {
      if (res.status === 200) {
        setTooltip({ ...tooltip, Valid: true });
      } else setTooltip({ ...tooltip, Valid: false });
    });
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    if (oldPassword === "" || ResetData.password === "" || cPassword === "")
      toast.error("Please enter all the mandatory fields");
    else if (tooltip.Valid === false) toast.error("Old password is not same");
    else {
      ChangePassword(ResetData).then((res) => {
        if (res.status === 200) {
          toast.success("Password has been changed successfully");
          setCPassword("");
          setOldPassword("");
          setResetData({ ...ResetData, password: "" });
          setTooltip({ isShow: false, Valid: false });
        }
      });
    }
  };
  return (
    <div>
      {/* <Header />
      <Sidebar /> */}
      <div className="content-wrapper flex  justify-center items-center">
        <div classname="container">
          <div className="flex   m-2 ">
            <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-2xl w-full">
              <div className="p-3 px-5 bg-white  ">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700 ">
                  Reset Password
                </h3>
                <form className="flex flex-col space-y-2">
                  <div className="flex flex-col  mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="Oldpassword"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Old Password <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div>
                      {" "}
                      <input
                        value={oldPassword}
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        onChange={onChangeOldpassword}
                        onBlur={() => setTooltip({ ...tooltip, isShow: false })}
                        onFocus={() => setTooltip({ ...tooltip, isShow: true })}
                        className="px-4 py-2 bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                      {tooltip.isShow ? (
                        <ToolTipValidation
                          isValid={tooltip.Valid}
                          validMessage="Correct"
                          invalidMessage={"Old password isn't correct "}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col  mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-500"
                      >
                        New Password <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <input
                      value={ResetData.password}
                      type="password"
                      id="password"
                      name="password"
                      onChange={(evt) => {
                        setPasswordValid(
                          CheckvalidatePassword(evt.target.value, passwordValid)
                        );
                        setResetData({
                          ...ResetData,
                          password: evt.target.value,
                        });
                      }}
                      className="px-4 py-2 bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col  mb-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Confirm Password <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <input
                      value={cPassword}
                      type="password"
                      id="cPassword"
                      name="cPassword"
                      onChange={(evt) => setCPassword(evt.target.value)}
                      onBlur={(evt) => {
                        if (evt.target.value !== ResetData.password) {
                          toast.error(
                            "Password and confirm password should be same"
                          );
                          setCPassword("");
                        }
                      }}
                      className="px-4 py-2 bg-sky-100  transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <button
                      className="btn-donate w-full mb-4"
                      onClick={onClickHandler}
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-white flex items-center">
                {" "}
                <PasswordValidateMessage
                  isView={ResetData.password === "" ? true : false}
                  passwordValid={passwordValid}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
