import * as actions from './ActionTypes'

export function setExercisesListLoading(isLoading) {
    return {
        type: actions.UI_EXERCISES_LIST_LOADING,
        isLoading
    }
}

export function setExerciseHistoryLoading(isLoading) {
    return {
        type: actions.UI_EXERCISE_HISTORY_LOADING,
        isLoading
    }
}

export function setExerciseEditorLoading(isLoading) {
    return {
        type: actions.UI_EXERCISE_EDITOR_LOADING,
        isLoading
    }
}

export function setExerciseHistoryInfo(id, caption) {
    return {
        type: actions.UI_EXERCISE_HISTORY_INFO,
        info: {
            id,
            caption,
        }
    }
}
