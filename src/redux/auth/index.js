import * as actions from './ActionTypes'

export function setGoogleUserInfo(googleUserInfo) {
    return {
        type: actions.AUTH_SET_GOOGLE_USER_INFO,
        googleUserInfo
    }
}

export function setTokens(tokens) {
    return {
        type: actions.AUTH_SET_TOKENS,
        tokens
    }
}