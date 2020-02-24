import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import * as Colors from '../constants/Colors'
import Waiting from '../components/Waiting'

class ExerciseEditorScreen extends Component {
    render() {
        const { isExerciseEditorLoading } = this.props
        return (
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                {isExerciseEditorLoading && (
                    <Waiting />
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isExerciseEditorLoading: state.ui.isExerciseEditorLoading,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseEditorScreen)
