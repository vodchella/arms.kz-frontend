import React, { Component } from 'react'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Text, Icon, View, Button } from 'native-base'
import FAB from 'react-native-fab'
import { SwipeListView } from 'react-native-swipe-list-view'
import * as RNLocalize from 'react-native-localize'
import { formatDate } from '../utils/Dates'
import Waiting from '../components/Waiting'
import * as RouteNames from '../constants/RouteNames'
import * as Colors from '../constants/Colors'
import * as thunk from '../thunk'
import IconForButton from '../components/IconForButton'
import styles from '../styles'
import SwipeListItem from '../components/SwipeListItem'

class ExercisesScreen extends Component {
    componentDidMount() {
        const { refreshExercises } = this.props
        refreshExercises()
    }

    openExerciseHistory = (exerciseId, exerciseName) => {
        const { navigation, refreshExerciseHistory } = this.props
        refreshExerciseHistory(exerciseId)
        navigation.navigate(RouteNames.EXERCISE_HISTORY, { id: exerciseId, caption: exerciseName })
    }

    addExercise = () => {
        const { navigation, prepareExerciseCreation } = this.props
        prepareExerciseCreation()
        navigation.navigate(RouteNames.EXERCISE_EDITOR)
    }

    editExercise = (exerciseId, exerciseName) => {
        const { navigation } = this.props
        navigation.navigate(RouteNames.EXERCISE_EDITOR, { id: exerciseId, caption: exerciseName })
    }

    removeExercise = (exerciseId, exerciseName) => {
        const { deleteExercise } = this.props
        Alert.alert(
            'Подтверждение',
            `Удалить '${exerciseName}'?`,
            [
                { text: 'Да', onPress: () => deleteExercise(exerciseId) },
                { text: 'Нет' },
            ]
        )
    }

    render() {
        const { exercisesList, isExercisesListLoading } = this.props
        const timeZone = RNLocalize.getTimeZone()
        return (
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                {isExercisesListLoading && (
                    <Waiting />
                )}
                {!isExercisesListLoading && (
                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            data={exercisesList}
                            renderItem={({ item: exercise }) => (
                                <SwipeListItem
                                    onPress={
                                        () => this.openExerciseHistory(exercise.id, exercise.name)
                                    }
                                >
                                    <Text>{exercise.name}</Text>
                                    {exercise.last_workout_date && (
                                        <Text note>
                                            {formatDate(exercise.last_workout_date, timeZone)}
                                        </Text>
                                    )}
                                </SwipeListItem>
                            )}
                            renderHiddenItem={({ item: exercise }) => (
                                <View style={styles.swipeRowBack}>
                                    <Button
                                        onPress={
                                            () => this.editExercise(exercise.id, exercise.name)
                                        }
                                    >
                                        <IconForButton name={'settings'} />
                                    </Button>
                                    <Button
                                        danger
                                        onPress={
                                            () => this.removeExercise(exercise.id, exercise.name)
                                        }
                                    >
                                        <IconForButton name={'trash'} />
                                    </Button>
                                </View>
                            )}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                        <FAB
                            buttonColor={Colors.PRIMARY}
                            iconTextColor={Colors.ON_PRIMARY}
                            onClickAction={this.addExercise}
                            iconTextComponent={<Icon name='add' />}
                            visible
                        />
                    </View>
                )}
            </Container>)
    }
}

const mapStateToProps = state => ({
    exercisesList: state.exercises.list,
    isExercisesListLoading: state.ui.isExercisesListLoading,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        refreshExercises: thunk.refreshExercises,
        deleteExercise: thunk.deleteExercise,
        refreshExerciseHistory: thunk.refreshExerciseHistory,
        prepareExerciseCreation: thunk.prepareExerciseCreation,
    }, dispatch),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen)
