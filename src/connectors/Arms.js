import { requestArms } from '../utils/Http'

class Arms {
    signInByGoogleToken(googleToken, onOk, onFail) {
        requestArms(null, 'POST', `signin/google?token=${googleToken}`, onOk, onFail)
    }

    listExercises(token, onOk, onFail) {
        requestArms(token, 'GET', 'exercise/list', onOk, onFail)
    }

    getExerciseHistory(token, exerciseId, onOk, onFail) {
        requestArms(token, 'GET', `exercise/${exerciseId}/history`, onOk, onFail)
    }
}

export default new Arms()