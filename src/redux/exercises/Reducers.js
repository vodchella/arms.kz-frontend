import * as actions from './ActionTypes'

const initialState = {
    list: [],
    history: [],
}

export default function exercisesReducer(state = initialState, action) {
    switch (action.type) {
        case actions.EXERCISES_SET_LIST:
            return {
                ...state,
                list: action.exercises,
            }
        case actions.EXERCISE_SET_HISTORY:
            return {
                ...state,
                history: action.history,
            }
        default:
            return state
    }
}