import React, { ChangeEvent, FC, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RadioButton from "components/RadioButton";
import { IAssessmentsKit } from "store/ducks/assessmentsKits";
import { IUserInfo } from "store/ducks/userInfo";
import { addAssessment, IAssessment } from "store/ducks/assessments";

interface IDetails {
  assessmentsKits: IAssessmentsKit[];
  userInfo: IUserInfo
}

const Kit = () => {
  const [ userAnswers, setUserAnswers ] = useState<IAssessment>({
    userId: 0,
    userAnswers: [],
    title: '',
    questions: []
  });
  const { title = '' } = useParams();
  const {
    assessmentsKits,
    userInfo
  }: IDetails = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const kit = assessmentsKits?.filter(kit => kit.title === title)?.[0];

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setUserAnswers(prevState => ({ ...prevState, userAnswers: [ ...prevState.userAnswers, value ] }))
    if (index === kit?.questions.length - 1) {
      dispatch(addAssessment({
        ...kit,
        userId: userInfo.id,
        userAnswers: [ ...userAnswers.userAnswers, value ]
      }))
    }
  };

  return (
    <div className='col-12 col-sm-6 mx-auto'>
      <h1>{kit.title}</h1>
      {kit?.questions.map((item, index) => (
        <div key={item.question} className="card p-3 mb-3">
          <h5>{item.question}</h5>
          {item.type === 'YON' ? (
            [ 'Yes', 'No' ].map(elm => (
              <RadioButton
                key={elm}
                value={elm}
                name={`answers_yon_${index}`}
                id={`answers_yon_${elm + index}`}
                label={elm}
                onChange={(e) => handleChange(e, index)}
              />
            ))
          ) : (
            item.answers.map((elm: string | number) => (
              <RadioButton
                key={elm}
                value={'' + elm}
                name={item.type + '_' + index}
                id={item.type + '_' + elm + index}
                label={'' + elm}
                onChange={(e) => handleChange(e, index)}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default Kit;