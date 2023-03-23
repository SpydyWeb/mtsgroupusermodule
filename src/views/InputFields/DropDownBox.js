import React from 'react';

const DropDownBox = ({ ddldata, lable, placeHolder, value, name, onChangeHandle, isMandatory }) => {
    return (
        <>
            <div className="w-full">
                <div className="text-sm font-semibold text-gray-500">
                    {lable} <span className={`text-red-600 ${isMandatory ? 'inline-block' : 'hidden'}`}>*</span>
                </div>
                <select
                    onChange={(evt) => onChangeHandle(evt)}
                    name={name}
                    value={value}
                    className="px-2 py-2 transition duration-300 border bg-sky-100 border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 w-full"
                >
                    <option slected={false}>{placeHolder}</option>
                    {ddldata.map((ele, indx) => {
                        return (
                            <option value={ele} key={indx}>
                                {ele}
                            </option>
                        );
                    })}
                </select>
            </div>
        </>
    );
};
DropDownBox.defaultProps = {
    lable: ' ',
    placeHolder: '',
    name: '',
    value: '',
    ddldata: [],
    isMandatory: false
};

export default DropDownBox;
