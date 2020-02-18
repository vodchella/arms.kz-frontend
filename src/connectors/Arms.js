import { requestArms } from '../utils/Http'

class Arms {
    signInByGoogleToken(googleToken, onOk, onFail) {
        requestArms(null, 'POST', `signin/google?token=${googleToken}`, onOk, onFail)
    }

    registerByGoogleToken(googleToken, onOk, onFail) {
        requestArms(null, 'POST', `register/google?token=${googleToken}`, onOk, onFail)
    }

    checkToken(token, onOk, onFail) {
        requestArms(token, 'GET', 'token/check', onOk, onFail)
    }

    refreshToken(token, onOk, onFail) {
        requestArms(token, 'POST', 'token/refresh', onOk, onFail)
    }

    listExercises(token, onOk, onFail, refreshToken, onTokenRefresh) {
        requestArms(token, 'GET', 'exercise/list',
            onOk, onFail, refreshToken, onTokenRefresh)
    }

    getExerciseHistory(token, exerciseId, onOk, onFail, refreshToken, onTokenRefresh) {
        requestArms(token, 'GET', `exercise/${exerciseId}/history`,
            onOk, onFail, refreshToken, onTokenRefresh)
    }
}

export default new Arms()
