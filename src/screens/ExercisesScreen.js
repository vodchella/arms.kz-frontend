import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, ListItem, Text, Body } from 'native-base'
import * as RNLocalize from 'react-native-localize'
import { formatDate } from '../utils/Dates'
import Waiting from '../components/Waiting'
import arms from '../connectors/Arms'
import * as RouteNames from '../constants/RouteNames'
import * as Colors from '../constants/Colors'
import * as ex from '../redux/exercises'
import * as ui from '../redux/ui'

class ExercisesScreen extends Component {
    componentDidMount() {
        const { setExercisesList, setExercisesListLoading } = this.props
        setExercisesListLoading(true)
        setExercisesList([])
        setTimeout(() => {
            arms.listExercises((exercises) => {
                setExercisesList(exercises)
                setExercisesListLoading(false)
            }, () => {
                setExercisesListLoading(false)
            })
        }, 1000)
    }

    openExerciseHistory = (exerciseId, exerciseName) => {
        const { navigation, setExerciseHistoryLoading, setExerciseHistory, setExerciseHistoryInfo } = this.props
        setExerciseHistoryLoading(true)
        setExerciseHistory([])
        setTimeout(() => {
            arms.getExerciseHistory(exerciseId,
                (history) => {
                    setExerciseHistoryInfo(exerciseId, exerciseName)
                    setExerciseHistory(history)
                    setExerciseHistoryLoading(false)
                }, () => {
                    setExerciseHistoryLoading(false)
                })
        }, 1000)
        navigation.navigate(RouteNames.EXERCISE_HISTORY)
    }

    render() {
        const { exercisesList, isExercisesListLoading } = this.props
        const timeZone = RNLocalize.getTimeZone()
        return (<>
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                {isExercisesListLoading && (
                    <Waiting />
                )}
                {!isExercisesListLoading && (
                    <Content>
                        <List>
                            {exercisesList.map(exercise => (
                                <ListItem key={exercise.id} onPress={() => this.openExerciseHistory(exercise.id, exercise.name)}>
                                    <Body>
                                        <Text>{exercise.name}</Text>
                                        {exercise.last_workout_date && (
                                            <Text note>{formatDate(exercise.last_workout_date, timeZone)}</Text>
                                        )}
                                    </Body>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                )}
            </Container></>)
    }
}

const mapStateToProps = state => ({
    exercisesList: state.exercises.list,
    isExercisesListLoading: state.ui.isExercisesListLoading,
})

const mapDispatchToProps = {
    setExercisesList: ex.setExercisesList,
    setExerciseHistory: ex.setExerciseHistory,
    setExercisesListLoading: ui.setExercisesListLoading,
    setExerciseHistoryLoading: ui.setExerciseHistoryLoading,
    setExerciseHistoryInfo: ui.setExerciseHistoryInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen)