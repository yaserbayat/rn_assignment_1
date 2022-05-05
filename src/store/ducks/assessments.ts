import { IAssessmentsKit } from "./assessmentsKits";
import { IAction } from "./userInfo";

export interface IAssessment extends IAssessmentsKit {
  userId: number;
  userAnswers: Array<string | number>;
}

// Actions
export const ADD_ASSESSMENT = 'assessment/ADD';

const initialState: IAssessment[] = [];
// Reducer
const assessments = (state = initialState, action: IAction<IAssessment>) => {
  switch (action.type) {
    case ADD_ASSESSMENT:
      return [...state, action.payload];
    default:
      return state;
  }
};

// Action creators
export const addAssessment = (payload: IAssessment) => {
  return {
    payload,
    type: ADD_ASSESSMENT,
  }
};

export default assessments;