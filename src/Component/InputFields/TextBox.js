import React from "react";

const TextBox = ({
  lable,
  placeHolder,
  value,
  inputTYpe,
  name,
  onChangeHandle,
  onBlur,
  onFocus,
  isMandatory,
}) => {
  return (
    <div className="w-full">
      <div className="text-sm font-semibold text-gray-500">
        {lable}{" "}
        <span
          className={`text-red-600 ${isMandatory ? "inline-block" : "hidden"}`}
        >
          *
        </span>
      </div>
      <input
        type={inputTYpe}
        placeholder={placeHolder}
        value={value}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(evt) => onChangeHandle(evt)}
        className="px-2 w-full py-2 transition duration-300 border inputFull border-gray-300 rounded focus:border-transparent focus:outline-none bg-sky-100 focus:ring-4 focus:ring-blue-200"
      />
    </div>
  );
};
TextBox.defaultProps = {
  lable: "",
  placeHolder: "",
  inputTYpe: "text",
  isMandatory: false,
};
export default TextBox;
