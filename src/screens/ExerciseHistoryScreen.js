import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, ListItem, Text, Body } from 'native-base'
import * as Colors from '../constants/Colors'

class ExerciseHistoryScreen extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: Colors.SURFACE }}>

            </Container>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseHistoryScreen)