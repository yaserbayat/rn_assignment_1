import React, {FC} from 'react';

interface IButton {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  title: string;
  className?: string;
  disabled?: boolean;
}

const Button: FC<IButton> = (props) => {
  const {type, className, onClick, title, disabled} = props;
  return (
    <button
      type={type}
      className={`btn ${className || ''}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
};

export default Button;