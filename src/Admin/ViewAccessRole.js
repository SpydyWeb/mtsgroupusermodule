import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { GetMappingsubRole, Deletemapping } from "../Services/Role";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import EditAccessrolepopup from "./EditAccessrolepopup";
const ViewAccessRole = () => {
  const [accessData, setAccessData] = useState([]);
  const [accessrole, setaccessrole] = useState({
    role: [],
    subroles: [],
  });
  const Navigate = useNavigate();
  useEffect(() => {
    GetMappingsubRole().then((res) => {
      console.log(res);
      setAccessData(res);
    });
  }, []);
  const onDeletehandler = (rolname, subrole) => {
    if (window.confirm("Do you want to delete the access control?")) {
      Deletemapping({
        role: rolname,
        subrole: subrole,
      }).then((res) => {
        if (res.status === 200) {
          toast.success("role deleted successfully");
          setInterval(() => {
            window.location.reload();
          }, 1000);
        }
      });
    }
  };

  return (
    <div>
      <div className="content-wrapper px-4">
        <div classname="container ">
          {" "}
          <div className="d-flex justify-end m-2 ">
            <button
              type="button"
              class="Btn_VA btn-success"
              onClick={() => Navigate("/admin/accessrole")}
            >
              Add
            </button>
          </div>
          <div className="accordion" id="accordionExample">
            {accessData.length>0?accessData.map((val) => {
              return (
                <div className="accordion-item" key={val.id}>
                  <h2
                    className="accordion-header flex items-center gap-2"
                    id={`heading${val.id}`}
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${val.id}`}
                      aria-expanded="false"
                      aria-controls={`collapse${val.id}`}
                    >
                      {val.name}
                    </button>
                    <AiFillEdit
                      title="Edit"
                      className="iconStyle m-2 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        let data = accessrole.role;
                        data.pop();
                        data.push(val.name);
                        let subdata = accessData.filter((ele) => {
                          return ele.name === val.name;
                        });
                        let subrolesdata = [];
                        subdata[0].subroles.map((ele) =>
                          subrolesdata.push(ele.name)
                        );
                        setaccessrole({
                          subroles: subrolesdata,
                          role: data,
                        });
                      }}
                    />
                  </h2>

                  <div
                    id={`collapse${val.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${val.id}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body p-4">
                      {val.subroles.length>0?val.subroles.map((subVal) => {
                        return (
                          <>
                          <span className="p-1 m-1 border-2 rounded-full inline-block text-xs">
                            
                            <div className="flex items-center gap-2">
                              {" "}
                              {subVal.name}
                              <span
                                className="bg-gray-200 rounded-full p-1 hover:bg-gray-400 cursor-pointer"
                                onClick={() => {
                                  onDeletehandler(val.name, subVal.name);
                                }}
                              >
                                <AiOutlineClose className="w-4 h-4" />
                              </span>
                            </div>
                          </span>
                          </>
                        );
                      }):''}
                    </div>
                  </div>
                </div>
              );
            }):""}
          </div>
        </div>
      </div>
      <Footer />
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className={"modal-dialog"}>
          <div class="modal-content">
            <div class={"modal-body bg-white  p-1 rounded-lg"}>
              <div className="flex justify-between items-baseline">
                <h3 className="mb-4 text-2xl font-bold text-gray-700 ">
                  Edit Access {accessrole.role[0]}
                </h3>
                <button
                  type="button"
                  className="btn-close focus:shadow-none"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closePopupaccesss"
                >
                  <i class="fas fa-times-circle"></i>
                </button>
              </div>
              {accessrole.role.length !== 0 ? (
                <EditAccessrolepopup data={accessrole} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAccessRole;
