import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, ListItem, Text } from 'native-base'
import Waiting from '../components/Waiting'
import arms from '../connectors/Arms'
import * as Colors from '../constants/Colors'
import * as ex from '../redux/exercises'
import * as ui from '../redux/ui'

class ExercisesScreen extends Component {
    componentDidMount() {
        const { setExercisesList, setExercisesListLoading } = this.props
        setExercisesListLoading(true)
        setExercisesList([])
        arms.listExercises((exercises) => {
            setExercisesList(exercises)
            setExercisesListLoading(false)
        }, () => {
            setExercisesListLoading(false)
        })
    }

    render() {
        const { exercisesList, isExercisesListLoading } = this.props
        return (<>
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                {isExercisesListLoading && (
                    <Waiting />
                )}
                {!isExercisesListLoading && (
                    <Content>
                        <List>
                            {exercisesList.map(exercise => (
                                <ListItem key={exercise.id}>
                                    <Text>{exercise.name}</Text>
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
    setExercisesListLoading: ui.setExercisesListLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen)