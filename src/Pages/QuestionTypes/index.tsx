import React, {FC} from 'react';
import {Form} from "react-final-form";
import InputField from "components/Field";
import Button from "components/Button";
import {useDispatch, useSelector} from "react-redux";
import {addQuestionType, deleteQuestionType, IQuestionType} from "store/ducks/questionTypes";
import {FormApi} from "final-form";

interface IQuestionTypeProps {

}

const QuestionTypes: FC<IQuestionTypeProps> = (props) => {
  const dispatch = useDispatch();
  const {questionTypes}: { questionTypes: IQuestionType[] } = useSelector((state: any) => state);

  const handleSubmit = (values: any, form: FormApi) => {
    if (questionTypes.filter(item => item.key === values.key || item.title === values.title).length > 0) {
      return {questionTypeError: 'This type is repetitive.'}
    }
    dispatch(addQuestionType({...values, id: new Date().getTime()}))
    form.reset();
  };
  const handleDeleteType = (id: number) => {
    dispatch(deleteQuestionType(id));
  }

  return (
    <div className='col-12 col-sm-6 mx-auto'>
      <Form
        onSubmit={(values, form) => handleSubmit(values, form)}
        render={({handleSubmit, pristine, submitErrors, values}) => (
          <form onSubmit={handleSubmit} className='border p-3 rounded-3'>
            <h3 className='text-center'>Add question type</h3>
            {submitErrors && <p className='alert alert-danger'>{submitErrors.questionTypeError}</p>}
            <InputField type='text' name='title' required label='title'/>
            <InputField type='text' name='key' required label='key'/>
            <Button type='submit' title='submit' className='btn-primary col-12' disabled={pristine}/>
          </form>
        )}
      />
      {questionTypes?.length ? (
        <div className='mt-4'>
          <h3 className='text-center'>Question types list</h3>
          <ol className="list-group list-group-numbered">
            {questionTypes?.map(item => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <p className="fw-bold">key: {item.key}</p>
                  {item.title}
                </div>
                <Button
                  className="badge bg-danger rounded-pill"
                  title={'Delete'}
                  onClick={() => handleDeleteType(item.id)}
                />
              </li>
            ))}
          </ol>

        </div>
      ) : null}
    </div>
  );
};

export default QuestionTypes;