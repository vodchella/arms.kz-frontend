import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, ListItem, Text } from 'native-base'
import arms from '../connectors/Arms'
import * as Colors from '../constants/Colors'
import * as ex from '../redux/exercises'

class ExercisesScreen extends Component {
    state = {
        exercises: []
    }

    componentDidMount() {
        const { setExercisesList } = this.props
        arms.listExercises((exercises) => {
            setExercisesList(exercises)
        })
    }

    render() {
        const { exercisesList } = this.props
        return (<>
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Упражнения</Text>
                        </ListItem>
                        {exercisesList.map(exercise => (
                            <ListItem key={exercise.id}>
                                <Text>{exercise.name}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container></>)
    }
}

const mapStateToProps = state => ({
    exercisesList: state.exercises.list,
})

const mapDispatchToProps = {
    setExercisesList: ex.setExercisesList,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen)