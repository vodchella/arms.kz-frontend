import { requestArms } from '../utils/Http'

class Arms {
    signInByGoogleToken(googleToken, onOk, onFail) {
        requestArms('POST', `signin/google?token=${googleToken}`, onOk, onFail)
    }

    listExercises(onOk, onFail) {
        requestArms('GET', 'exercise/list', onOk, onFail)
    }

    getExerciseHistory(exerciseId, onOk, onFail) {
        requestArms('GET', `exercise/${exerciseId}/history`, onOk, onFail)
    }
}

export default new Arms()