import { IAssessmentsKit } from "./assessmentsKits";
import { IAction } from "./userInfo";

export interface IAssessment extends IAssessmentsKit {
  userId: number;
  userAnswers: Array<string>;
}

// Actions
export const ADD_ASSESSMENT = 'assessment/ADD';
export const UPDATE_ASSESSMENT = 'assessment/UPDATE';

const initialState: IAssessment[] = [];
// Reducer
const assessments = (state = initialState, action: IAction<IAssessment>) => {
  switch (action.type) {
    case ADD_ASSESSMENT:
      return [ ...state, action.payload ];
    case UPDATE_ASSESSMENT:
      return state.map(item => {
        if (item.userId === action.payload?.userId && item.title === action.payload.title) {
          return { ...item, userAnswers: action.payload.userAnswers };
        } else return item;
      })
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
export const updateAssessment = (userId: number, title: string, userAnswers: IAssessment["userAnswers"]) => {
  return {
    payload: { userId, title, userAnswers },
    type: UPDATE_ASSESSMENT,
  }
};

export default assessments;