import USERS from "data/users";
import {IAction, UserInfo} from "./userInfo";


// Actions
export const SET_USERS = 'users/SET';
export const RESET_USERS = 'users/RESET';

const initialState: UserInfo[] = USERS
// Reducer
const users = (state = initialState, action: IAction<UserInfo>) => {
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
export const setUsers = (payload: UserInfo) => {
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