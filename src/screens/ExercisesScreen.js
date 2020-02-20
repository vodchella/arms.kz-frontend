import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TouchableHighlight, StyleSheet } from 'react-native'
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

class ExercisesScreen extends Component {
    componentDidMount() {
        const { refreshExercises } = this.props
        refreshExercises()
    }

    openExerciseHistory = (exerciseId, exerciseName) => {
        const { navigation, refreshExerciseHistory } = this.props
        refreshExerciseHistory(exerciseId, exerciseName)
        navigation.navigate(RouteNames.EXERCISE_HISTORY)
    }

    addExercise = () => {}

    render() {
        const { exercisesList, isExercisesListLoading } = this.props
        const timeZone = RNLocalize.getTimeZone()
        return (<>
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                {isExercisesListLoading && (
                    <Waiting />
                )}
                {!isExercisesListLoading && (
                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            data={exercisesList}
                            renderItem={({ item: exercise }) => (
                                <TouchableHighlight
                                    onPress={
                                        () => this.openExerciseHistory(exercise.id, exercise.name)
                                    }
                                    style={styles.rowFront}
                                    underlayColor={Colors.BACKGROUND}
                                >
                                    <View style={{ marginLeft: 30 }}>
                                        <Text>{exercise.name}</Text>
                                        {exercise.last_workout_date && (
                                            <Text note>
                                                {formatDate(exercise.last_workout_date, timeZone)}
                                            </Text>
                                        )}
                                    </View>
                                </TouchableHighlight>
                            )}
                            renderHiddenItem={({ item: exercise }) => (
                                <View style={styles.rowBack}>
                                    <Button>
                                        <IconForButton name={'settings'} />
                                    </Button>
                                    <Button>
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
            </Container></>)
    }
}

const mapStateToProps = state => ({
    exercisesList: state.exercises.list,
    isExercisesListLoading: state.ui.isExercisesListLoading,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        refreshExercises: thunk.refreshExercises,
        refreshExerciseHistory: thunk.refreshExerciseHistory,
    }, dispatch),
    dispatch
})

const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: Colors.SURFACE,
        borderBottomColor: Colors.BACKGROUND,
        borderBottomWidth: 2,
        justifyContent: 'center',
        height: 60,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen)
