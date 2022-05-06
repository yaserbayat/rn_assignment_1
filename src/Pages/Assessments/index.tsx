import React from 'react';
import { useSelector } from "react-redux";
import { IAssessment } from "store/ducks/assessments";
import { IUserInfo } from "store/ducks/userInfo";
import RadioButton from "components/RadioButton";

interface IDetails {
  assessments: IAssessment[];
  users: IUserInfo[]
}

const Assessments = () => {
  const { assessments, users }: IDetails = useSelector((state: any) => state)
  const assessmentsBaseOnUser: IAssessment = assessments?.reduce((obj, item) => {
    obj[item.userId] = obj[item.userId] || [];
    obj[item.userId].push(item);
    return obj;
  }, Object.create(null));

  return (
    <div className='col-12 col-sm-6 mx-auto'>
      {Object.values(assessmentsBaseOnUser).map((item: IAssessment[], indexOfId) => {
        const id = +Object.keys(assessmentsBaseOnUser)[indexOfId];
        const user = users.filter(user => user.id === id)?.[0];
        return (
          <React.Fragment key={id}>
            <h4 className='text-primary'>{user.name} {user.family}</h4>
            <div className='card p-2 p-md-3 mb-4'>
              {item.map(elm => (
                <div key={elm.title}>
                  <h5>{elm.title}</h5>
                  <hr/>
                  {elm.questions.map((qst, idx) => (
                    <React.Fragment key={qst.question}>
                      <h6>{qst.question}</h6>
                      {qst.answers?.length > 0 ? (
                        qst.answers.map((ans: string, index: number) => (
                          <RadioButton
                            key={ans}
                            value={ans}
                            name={qst.question + indexOfId}
                            label={ans}
                            id={qst.question + index}
                            checked={+qst.correct_answer === index + 1}
                            disabled
                          />
                        ))
                      ) : null}
                      <b className='text-truncate'>user answer: {elm?.userAnswers?.[idx]}</b>
                      <hr/>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default Assessments;