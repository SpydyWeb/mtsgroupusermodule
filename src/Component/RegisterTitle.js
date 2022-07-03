import React from "react";
import Registration from "./Headers/Register";

const RegisterTitle = () => {
  return (
    <div>
      {" "}
      <div className="bg-white p-3 rounded-md">
        <div className="flex justify-between items-baseline">
          <h3 className="mb-4 text-2xl font-bold text-gray-700 ">
            Registration
          </h3>
          <button
            type="button"
            className="btn-close focus:shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fas fa-times-circle"></i>
          </button>
        </div>

        <Registration />
      </div>
    </div>
  );
};

export default RegisterTitle;
