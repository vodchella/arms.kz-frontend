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
            onOk: (exercises, dispatch) => {
                dispatch(ex.setExercisesList(exercises))
            },
            onFin: (dispatch) => {
                dispatch(ui.setExercisesListLoading(false))
            },
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

export function refreshExerciseHistory(exerciseId, exerciseName) {
    return worker(
        arms.getExerciseHistory,
        exerciseId,
        {
            onBeg: (dispatch) => {
                dispatch(ui.setExerciseHistoryLoading(true))
                dispatch(ex.setExerciseHistory([]))
            },
            onOk: (history, dispatch) => {
                dispatch(ui.setExerciseHistoryInfo(exerciseId, exerciseName))
                dispatch(ex.setExerciseHistory(history))
            },
            onFin: (dispatch) => {
                dispatch(ui.setExerciseHistoryLoading(false))
            },
        }
    )
}
