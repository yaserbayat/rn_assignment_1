import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FormApi } from "final-form";
import Link from "components/Link";
import KitForm from "components/KitForm";
import { addKit, deleteKit, IAssessmentsKit } from "store/ducks/assessmentsKits";
import Button from "../../components/Button";


const AssessmentsKits = (props: { isAdmin: boolean }) => {
  const { isAdmin } = props;
  const dispatch = useDispatch();
  const { assessmentsKits }: { assessmentsKits: IAssessmentsKit[] } = useSelector((state: any) => state);
  const handleSubmit = (values: any, form: FormApi) => {
    const newValues = {
      ...values,
      questions: values.questions.map((item: any) => ({ ...item, answers: item.answers.split(',') }))
    }
    dispatch(addKit(newValues));
    form.reset();
  };

  return (
    <div className='col-12 col-sm-6 mx-auto'>
      {isAdmin ? <KitForm onSubmit={handleSubmit}/> : null}
      <h1 className='text-center mt-3'>Assessments Kits</h1>
      {assessmentsKits?.map(kit => (
        <div className="card mb-3" key={kit.title}>
          <div className="card-body">
            <h5 className="card-title">{kit.title}</h5>
            <p className="card-text">{kit.title}</p>
            <div className='d-flex justify-content-between'>
              <Link
                to={`${kit.title}`}
                className='btn btn-primary d-inline text-light'
                title='Use this Kit'
              />
              {isAdmin && (
                <Button
                  className='btn-danger'
                  title='Delete'
                  onClick={() => dispatch(deleteKit(kit.title))}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssessmentsKits;