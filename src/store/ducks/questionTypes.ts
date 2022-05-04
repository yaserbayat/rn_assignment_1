import QUESTION_TYPES from "data/question_types";
import {IAction} from "./userInfo";

export interface IQuestionType {
  id: number;
  title: string;
  key: string;
}

//Actions
export const ADD_QUESTION_TYPE = 'questions/ADD';
export const DELETE_QUESTION_TYPE = 'questions/DELETE';

const initialState: IQuestionType[] = QUESTION_TYPES;
// Reducer
const questionTypes = (state = initialState, action: IAction<IQuestionType>) => {
  switch (action.type) {
    case ADD_QUESTION_TYPE:
      return [...state, action.payload];
    case DELETE_QUESTION_TYPE:
      return state.filter(question => question.id !== action.payload?.id);
    default:
      return state;
  }
};

// Action creator
export const addQuestionType = (payload: IQuestionType) => {
  return {
    payload,
    type: ADD_QUESTION_TYPE
  }
};
export const deleteQuestionType = (id: number) => {
  return {
    payload: {id},
    type: DELETE_QUESTION_TYPE
  }
};

export default questionTypes;