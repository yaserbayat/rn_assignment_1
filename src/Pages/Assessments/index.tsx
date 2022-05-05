import React from 'react';
import { useSelector } from "react-redux";
import { IAssessment } from "store/ducks/assessments";

const Assessments = () => {
  const { assessments }: {assessments: IAssessment[]} = useSelector((state: any) => state)
  console.log(assessments)
  return (
    <div>
      Assessments
    </div>
  );
};

export default Assessments;