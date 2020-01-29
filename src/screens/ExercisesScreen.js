import React, { Component } from 'react'
import { Container, Content, List, ListItem, Text } from 'native-base'
import arms from '../connectors/Arms'
import * as Colors from '../constants/Colors'

class ExercisesScreen extends Component {
    state = {
        exercises: []
    }

    componentDidMount() {
        arms.listExercises((exercises) => {
            this.setState({ exercises })
        })
    }

    render() {
        const { exercises } = this.state
        return (<>
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Упражнения</Text>
                        </ListItem>
                        {exercises.map(exercise => (
                            <ListItem key={exercise.id}>
                                <Text>{exercise.name}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
            </>)
    }
}

export default ExercisesScreen