import React, {FC} from 'react';
import {Field} from "react-final-form";

interface IField {
    type: React.HTMLInputTypeAttribute;
    name: string;
    label?: string;
    text?: string;
    required?: boolean;
    placeholder?: string;
}

const InputField: FC<IField> = (props) => {
    const {type, name, label, text, required, placeholder} = props;
    return (
        <Field name={name}>
            {({input, meta}) => (
                <div className="mb-3">
                    {label && <label htmlFor={name} className="form-label">{label}</label>}
                    <input
                        {...input}
                        type={type}
                        className="form-control"
                        placeholder={placeholder}
                        required={required}
                    />
                    {text && <span className="form-text">{text}</span>}
                </div>
            )}
        </Field>
    );
};

export default InputField;