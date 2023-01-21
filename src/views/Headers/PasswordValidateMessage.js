import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import data from './dbAuten.json';
const PasswordValidateMessage = ({ isView, passwordValid }) => {
    return (
        <div className={`${isView ? 'hidden' : 'block py-4 text-sm '}`}>
            {data.PasswordValidateMessage.map((ele, indx) => {
                return (
                    <div className="flex items-center gap-2" key={indx}>
                        {passwordValid[ele.type] ? <FaCheck className="text-yellow-500" /> : <ImCross className="text-red-600" />}
                        <div>{ele.message}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default PasswordValidateMessage;
