import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import IconForButton from '../IconForButton'
import arms from '../../connectors/Arms'
import * as ex from '../../redux/exercises'
import * as ui from '../../redux/ui'

class ExercisesHeader extends Component {
    state = {
        buttonDisabled: false,
    }

    onButtonPress = () => {
        const { setExercisesList, setExercisesListLoading, tokens } = this.props
        if (tokens) {
            this.setState({ buttonDisabled: true })
            setExercisesListLoading(true)
            setExercisesList([])
            setTimeout(this.refreshExercises, 1000)
        }
    }

    refreshExercises = () => {
        const { setExercisesList, setExercisesListLoading, tokens } = this.props
        const { auth: authToken } = tokens
        arms.listExercises(authToken, (exercises) => {
            setExercisesList(exercises)
            setExercisesListLoading(false)
            this.setState({ buttonDisabled: false })
        }, () => {
            setExercisesListLoading(false)
            this.setState({ buttonDisabled: false })
        })
    }

    render() {
        const { buttonDisabled } = this.state
        return (
            <Button
                transparent
                disabled={buttonDisabled}
                onPress={this.onButtonPress}
            >
                <IconForButton name='refresh' onTransparent />
            </Button>
        )
    }
}

const mapStateToProps = state => ({
    tokens: state.auth.tokens,
})

const mapDispatchToProps = {
    setExercisesList: ex.setExercisesList,
    setExercisesListLoading: ui.setExercisesListLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesHeader)
