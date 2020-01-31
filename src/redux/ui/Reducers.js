
import * as actions from './ActionTypes'

const initialState = {
    isExercisesListLoading: false,
}

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actions.UI_EXERCISES_LIST_LOADING:
            return {
                ...state,
                isExercisesListLoading: action.isLoading,
            }
        default:
            return state
    }
}