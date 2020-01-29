import { requestArms } from '../utils/Http'

class Arms {
    listExercises(onOk, onFail) {
        requestArms('exercise/list', onOk, onFail)
    }
}

export default new Arms()