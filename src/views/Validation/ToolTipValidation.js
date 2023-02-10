import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
const ToolTipValidation = ({ validMessage, invalidMessage, isValid }) => {
    return (
        <div
            className={`border-2 absolute p-2 ${
                isValid ? 'border-green-500' : 'border-red-500'
            } mt-1 max-w-[200px] break-words  bg-white rounded-md `}
            style={{ zIndex: 9999 }}
        >
            {isValid ? (
                <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-600 text-lg" style={{ color: 'green' }} />
                    <p>{validMessage}</p>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <AiFillCloseCircle className="text-red-600 text-lg" style={{ color: 'red' }} />
                    <p>{invalidMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ToolTipValidation;
