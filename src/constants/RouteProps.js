import React from 'react'
import ExercisesHeader from '../components/headers/ExercisesHeader'
import * as RouteNames from './RouteNames'

const ROUTE_PROPS = {
    [RouteNames.WORKOUTS]: {
        title: 'Тренировки',
        rightHeader: <></>,
    },
    [RouteNames.EXERCISES]: {
        title: 'Упражнения',
        rightHeader: <ExercisesHeader />,
    },
    [RouteNames.EXERCISE_HISTORY]: {
        title: 'История',
        rightHeader: <></>,
    },
    [RouteNames.EXERCISE_EDITOR]: {
        title: 'Упражнение',
        rightHeader: <></>,
    },
    [RouteNames.WELCOME]: {
        title: 'Об arms.kz',
        rightHeader: <></>,
    },
}

export default ROUTE_PROPS
