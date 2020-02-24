import * as actions from './ActionTypes'

export function setExercisesList(exercises) {
    return {
        type: actions.EXERCISES_SET_LIST,
        exercises
    }
}

export function setExerciseCategoriesList(categories) {
    return {
        type: actions.EXERCISES_SET_CATEGORIES_LIST,
        categories
    }
}

export function setExerciseHistory(history) {
    return {
        type: actions.EXERCISE_SET_HISTORY,
        history
    }
}
