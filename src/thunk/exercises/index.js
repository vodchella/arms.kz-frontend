import worker from '../Worker'
import arms from '../../connectors/Arms'
import * as ex from '../../redux/exercises'
import * as ui from '../../redux/ui'

export function refreshExercises() {
    return worker(
        arms.listExercises,
        null,
        {
            onBeg: (dispatch) => {
                dispatch(ex.setExercisesList([]))
                dispatch(ui.setExercisesListLoading(true))
            },
            onOk: (exercises, dispatch) => dispatch(ex.setExercisesList(exercises)),
            onFin: (dispatch) => dispatch(ui.setExercisesListLoading(false)),
        }
    )
}

export function deleteExercise(exerciseId) {
    return worker(
        arms.deleteExercise,
        exerciseId,
        {
            onBeg: (dispatch) => dispatch(ui.setExercisesListLoading(true)),
            onOk: (res, dispatch) => dispatch(refreshExercises()),
            onErr: (dispatch) => dispatch(ui.setExercisesListLoading(false)),
        }
    )
}

export function refreshExerciseHistory(exerciseId) {
    return worker(
        arms.getExerciseHistory,
        exerciseId,
        {
            onBeg: (dispatch) => {
                dispatch(ui.setExerciseHistoryLoading(true))
                dispatch(ex.setExerciseHistory([]))
            },
            onOk: (history, dispatch) => dispatch(ex.setExerciseHistory(history)),
            onFin: (dispatch) => dispatch(ui.setExerciseHistoryLoading(false)),
        }
    )
}

export function refreshExerciseCategories(onFin) {
    return worker(
        arms.listExerciseCategories,
        null,
        {
            onBeg: (dispatch) => dispatch(ex.setExerciseCategoriesList([])),
            onOk: (categories, dispatch) => dispatch(ex.setExerciseCategoriesList(categories)),
            onFin: (dispatch) => {
                if (typeof onFin === 'function') {
                    onFin(dispatch)
                }
            }
        }
    )
}

export function prepareExerciseCreation() {
    return (dispatch) => {
        dispatch(ui.setExerciseEditorLoading(true))
        dispatch(refreshExerciseCategories(() => {
            dispatch(ui.setExerciseEditorLoading(false))
        }))
    }
}
