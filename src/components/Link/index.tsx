import React, {FC} from 'react';
import {NavLink, NavLinkProps} from "react-router-dom";

interface ILink extends NavLinkProps {
  className?: string;
}

const Link: FC<ILink> = (props) => {
  const {to, title, className} = props;
  return (
    <NavLink
      className={`nav-link ${className || ''}`.trim()}
      to={to}
      title={title}
    >
      {title}
    </NavLink>
  );
};

export default Link;