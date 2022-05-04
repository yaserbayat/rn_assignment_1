import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FormApi } from "final-form";
import Link from "components/Link";
import KitForm from "components/KitForm";
import { addKit, IAssessmentsKit } from "store/ducks/assessmentsKits";


const AssessmentsKits = (props: { isAdmin: boolean }) => {
  const dispatch = useDispatch();
  const { assessmentsKits }: { assessmentsKits: IAssessmentsKit[] } = useSelector((state: any) => state);
  const handleSubmit = (values: any, form: FormApi) => {
    dispatch(addKit(values));
    form.reset();
  };
  return (
    <div className='col-12 col-sm-6 mx-auto'>
      {props.isAdmin ? <KitForm onSubmit={handleSubmit}/> : null}
      <h1 className='text-center mt-3'>Assessments Kits</h1>
      {assessmentsKits?.map(kit => (
        <div className="card mb-3" key={kit.title}>
          <div className="card-body">
            <h5 className="card-title">{kit.title}</h5>
            <p className="card-text">{kit.title}</p>
            <Link
              to={`${kit.title}`}
              className='btn btn-primary text-light'
              title='Use this Kit'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssessmentsKits;