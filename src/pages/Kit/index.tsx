import React, { ChangeEvent, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RadioButton from "components/RadioButton";
import { IAssessmentsKit } from "store/ducks/assessmentsKits";
import { IUserInfo } from "store/ducks/userInfo";
import { addAssessment, IAssessment, updateAssessment } from "store/ducks/assessments";

interface IDetails {
  assessmentsKits: IAssessmentsKit[];
  userInfo: IUserInfo;
  assessments: IAssessment[];
}

const Kit = () => {
  const { title = '' } = useParams();
  const {
    assessmentsKits,
    userInfo,
    assessments
  }: IDetails = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const kit = assessmentsKits?.filter(kit => kit.title === title)?.[0];

  const [ userAnswersKit, setUserAnswersKit ] = useState<string[]>(
    assessments?.filter(
      item => item.userId === userInfo.id && item.title === kit?.title
    )[0]?.userAnswers ?? []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const isLastOne = index === kit?.questions.length - 1;

    if (userAnswersKit?.[index]) {
      const answers = userAnswersKit;
      answers[index] = value;

      if (isLastOne) {
        dispatch(updateAssessment(userInfo.id, title, answers));
      }
      setUserAnswersKit(answers)
    } else {
      if (isLastOne) {
        dispatch(addAssessment({
          ...kit,
          userId: userInfo.id,
          userAnswers: [ ...userAnswersKit, value ]
        }))
      }
      setUserAnswersKit(prevState => ([ ...prevState, value ]))
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