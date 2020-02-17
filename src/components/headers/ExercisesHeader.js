import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import IconForButton from '../IconForButton'
import * as thunk from '../../thunk'

class ExercisesHeader extends Component {
    render() {
        const { isExercisesListLoading, refreshExercises } = this.props
        return (
            <Button
                transparent
                disabled={isExercisesListLoading}
                onPress={refreshExercises}
            >
                <IconForButton name='refresh' onTransparent />
            </Button>
        )
    }
}

const mapStateToProps = state => ({
    isExercisesListLoading: state.ui.isExercisesListLoading,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        refreshExercises: thunk.refreshExercises,
    }, dispatch),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesHeader)
