import React, { useEffect, useState } from 'react';
import { GetsubRole, CreateMapping, Deletemapping } from '../../servicesapi/Userroleapi';
import toast from 'react-hot-toast';
const EditAccessrolepopup = ({ data }) => {
    const [subrole, setsubrole] = useState([]);
    const [editData, seteditData] = useState(data);
    useEffect(() => {
        GetsubRole().then((res) => {
            setsubrole(res);
        });
    }, []);
    const onClickhandler = (evt) => {
        if (evt.target.checked) {
            let data = editData.subroles;
            data.push(evt.target.name);
            seteditData({
                ...editData,
                subroles: data
            });
        } else {
            Deletemapping({
                role: editData.role[0],
                subrole: evt.target.name
            }).then((res) => {
                console.log(res);
            });
            let data = editData.subroles;
            data = data.filter((ele) => {
                return ele !== evt.target.name;
            });
            seteditData({
                ...editData,
                subroles: data
            });
        }
    };
    const onSubmithandler = () => {
        if (editData.role.length === 0) {
            toast.error('Please Select role or access role');
        } else {
            CreateMapping(editData).then((res) => {
                if (res.status === 200) {
                    toast.success('Mapping Updated successfully');

                    setInterval(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    toast.error('Somting wrong');
                }
            });
        }
    };
    return (
        <div>
            {' '}
            <div className="flex gap-3 m-2 flex-wrap">
                {subrole.map((ele, indx) => {
                    return (
                        <div key={indx}>
                            <input
                                type={'checkbox'}
                                defaultChecked={editData.subroles.includes(ele.subrole)}
                                name={ele.subrole}
                                onClick={onClickhandler}
                            />{' '}
                            <span>{ele.subrole}</span>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-end m-3">
                <button className="btn-donate " onClick={onSubmithandler}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditAccessrolepopup;
