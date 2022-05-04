import USERS from "data/users";
import {IAction, IUserInfo} from "./userInfo";


// Actions
export const SET_USERS = 'users/SET';
export const RESET_USERS = 'users/RESET';

const initialState: IUserInfo[] = USERS
// Reducer
const users = (state = initialState, action: IAction<IUserInfo>) => {
    switch (action.type) {
        case SET_USERS:
            return [...state, action.payload];
        case RESET_USERS:
            return initialState;
        default:
            return state;
    }
}

// Action creators
export const setUsers = (payload: IUserInfo) => {
    return {
        payload,
        type: SET_USERS,
    }
}
export const resetUsers = () => {
    return {
        type: RESET_USERS,
    }
}

export default users;