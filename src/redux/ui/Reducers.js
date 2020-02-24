import * as actions from './ActionTypes'

const initialState = {
    isExercisesListLoading: false,
    isExerciseHistoryLoading: false,
    isExerciseEditorLoading: false,
    exerciseHistoryInfo: {
        id: '',
        caption: '',
    },
    exerciseEditorInfo: {
        id: '',
        caption: '',
    },
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
    case actions.UI_EXERCISE_HISTORY_INFO:
        return {
            ...state,
            exerciseHistoryInfo: {
                id: action.info.id,
                caption: action.info.caption,
            },
        }
    default:
        return state
    }
}
