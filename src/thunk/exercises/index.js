import arms from '../../connectors/Arms'
import * as ex from '../../redux/exercises'
import * as ui from '../../redux/ui'

export function refreshExercises() {
    return (dispatch, getState) => {
        const { tokens } = getState().auth
        if (tokens) {
            const { auth: authToken } = tokens
            dispatch(ex.setExercisesList([]))
            dispatch(ui.setExercisesListLoading(true))
            setTimeout(() => {
                arms.listExercises(authToken, (exercises) => {
                    dispatch(ex.setExercisesList(exercises))
                    dispatch(ui.setExercisesListLoading(false))
                }, () => {
                    dispatch(ui.setExercisesListLoading(false))
                })
            }, 1000)
        }
    }
}
