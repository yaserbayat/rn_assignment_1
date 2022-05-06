import React, { ChangeEvent, FC } from "react";

interface IRadio {
  value: string;
  name: string;
  label: string;
  id: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  checked?: boolean;
}

const RadioButton: FC<IRadio> = (props) => {
  const { value, name, label, id, onChange, disabled, checked } = props;
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        value={value}
        type="radio"
        name={name}
        id={id}
        onChange={onChange}
        disabled={disabled}
        defaultChecked={checked}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
