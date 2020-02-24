import * as actions from './ActionTypes'

const initialState = {
    list: [],
    history: [],
    categories: [],
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
    case actions.EXERCISES_SET_CATEGORIES_LIST:
        return {
            ...state,
            categories: action.categories,
        }
    default:
        return state
    }
}
