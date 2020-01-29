import * as actions from './ActionTypes'

export function setExercisesList(exercises) {
    return {
        type: actions.EXERCISES_SET_LIST,
        exercises
    }
}