import KIT_SAMPLE from "data/kit_sample";
import { IAction } from "./userInfo";

interface IQuestions {
  type: string;
  question: string;
  answers?: any;
  correct_answer: number | string;
}

export interface IAssessmentsKit {
  title: string;
  questions: IQuestions[];
}

// Actions
export const ADD_KIT = 'kits/ADD';
export const DELETE_KIT = 'kits/DELETE';
export const UPDATE_KIT = 'kits/UPDATE';

const initialState: IAssessmentsKit[] = [ KIT_SAMPLE ];
// Reducer
const assessmentsKits = (state = initialState, action: IAction<IAssessmentsKit>) => {
  switch (action.type) {
    case ADD_KIT:
      return [ ...state, action.payload ];
    case DELETE_KIT:
      return state.filter(kit => kit.title !== action.payload?.title);
    case UPDATE_KIT:
      return state.map(kit => {
        return kit.title === action.payload?.title ? { ...kit, questions: action.payload.questions } : kit
      });
    default:
      return state;
  }
};

// Action creators
export const addKit = (payload: IAssessmentsKit) => {
  return {
    payload,
    type: ADD_KIT
  }
};
export const deleteKit = (title: string) => {
  return {
    payload: { title },
    type: DELETE_KIT
  }
};
export const updateKit = (title: string, questions: IQuestions) => {
  return {
    payload: { title, questions },
    type: UPDATE_KIT
  }
};
export default assessmentsKits;