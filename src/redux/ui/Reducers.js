import * as actions from './ActionTypes'

const initialState = {
    isExercisesListLoading: false,
    isExerciseHistoryLoading: false,
    isExerciseEditorLoading: false,
}

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
    case actions.UI_EXERCISES_LIST_LOADING:
        return {
            ...state,
            isExercisesListLoading: action.isLoading,
        }
    case actions.UI_EXERCISE_HISTORY_LOADING:
        return {
            ...state,
            isExerciseHistoryLoading: action.isLoading,
        }
    case actions.UI_EXERCISE_EDITOR_LOADING:
        return {
            ...state,
            isExerciseEditorLoading: action.isLoading,
        }
    default:
        return state
    }
}
