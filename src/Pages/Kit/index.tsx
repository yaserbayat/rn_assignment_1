import React, { FC } from 'react';
import { useParams } from "react-router-dom";

interface IKit {

}
const Kit: FC<IKit> = (props) => {
  const {title} = useParams();
  return (
    <div>
      <h1>{title}</h1>

    </div>
  );
};

export default Kit;