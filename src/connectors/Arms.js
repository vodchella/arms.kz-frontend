import { requestArms } from '../utils/Http'

class Arms {
    listExercises(onOk, onFail) {
        requestArms('exercise/list', onOk, onFail)
    }

    getExerciseHistory(exerciseId, onOk, onFail) {
        requestArms(`exercise/${exerciseId}/history`, onOk, onFail)
    }
}

export default new Arms()