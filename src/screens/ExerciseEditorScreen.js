import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text } from 'native-base'
import * as Colors from '../constants/Colors'
import Waiting from '../components/Waiting'

class ExerciseEditorScreen extends Component {
    render() {
        const { isExerciseEditorLoading, categories } = this.props
        return (
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                {isExerciseEditorLoading && (
                    <Waiting />
                )}
                {!isExerciseEditorLoading && (
                    <Text>{JSON.stringify(categories)}</Text>
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isExerciseEditorLoading: state.ui.isExerciseEditorLoading,
    categories: state.exercises.categories,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseEditorScreen)
