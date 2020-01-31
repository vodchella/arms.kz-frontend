import * as actions from './ActionTypes'

export function setExercisesListLoading(isLoading) {
    return {
        type: actions.UI_EXERCISES_LIST_LOADING,
        isLoading
    }
}