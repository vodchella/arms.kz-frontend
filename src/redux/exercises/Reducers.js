import * as actions from './ActionTypes'

const initialState = {
    list: [],
}

export default function exercisesReducer(state = initialState, action) {
    switch (action.type) {
        case actions.EXERCISES_SET_LIST:
            return {
                ...state,
                list: action.exercises,
            }
        default:
            return state
    }
}