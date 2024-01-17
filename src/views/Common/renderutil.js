import React from 'react';
import MaskedInput from 'react-text-mask';

export const PhonenoMask = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
};

export const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
};

export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const ControlledTextField = (props) => {
    return (
        <div className="form-floating mt-1">
            <input
                type={props.type}
                className="form-control"
                id={props.id}
                placeholder={props.label}
                pattern={props.pattern}
                value={props.value}
                maxLength={props.maxLength}
                onChange={props.onChange}
                title={props.label}
                onBlur={props.onBlur}
                name={props.name}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};
