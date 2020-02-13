import * as actions from './ActionTypes'

const initialState = {
    googleUserInfo: null,
    tokens: null,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
    case actions.AUTH_SET_GOOGLE_USER_INFO:
        return {
            ...state,
            googleUserInfo: action.googleUserInfo,
        }
    case actions.AUTH_SET_TOKENS:
        return {
            ...state,
            tokens: action.tokens,
        }
    default:
        return state
    }
}
