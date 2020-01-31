
import React, { Component } from 'react'
import { Button } from 'native-base'
import IconForButton from '../IconForButton'

class ExercisesHeader extends Component {
    render() {
        return (
            <Button transparent>
                <IconForButton name='refresh' onTransparent />
            </Button>
        )
    }
}

export default ExercisesHeader