export enum USER_ROLE {
    CANDIDATE = "candidate",
    ADMIN = 'admin',
}
export interface IUserInfo {
    id: number,
    password: string,
    name: string,
    family: string,
    email: string;
    role: USER_ROLE | string,
}
export interface IAction<T> {
    payload?: T;
    type: string;
}
// Actions
export const SET_USER_INFO = 'user/SET';
export const RESET_USER_INFO = 'user/RESET';
const initialState: IUserInfo | {} = {};

// Reducer
const userInfo = (state = initialState, action: IAction<IUserInfo>) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {...state, ...action.payload};
        case RESET_USER_INFO:
            return initialState;
        default:
            return state;

    }
};

//Action creators
export const setUserInfo = (payload: IUserInfo) => {
    return {
        payload,
        type: SET_USER_INFO
    }
}
export const resetUserInfo = () => {
    return { type: RESET_USER_INFO }
}

export default userInfo;