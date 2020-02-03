import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, ListItem, Text, Body } from 'native-base'
import * as Colors from '../constants/Colors'

class ExerciseHistoryScreen extends Component {
    render() {
        const { info } = this.props
        return (
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>{info.caption}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    info: state.ui.exerciseHistoryInfo,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseHistoryScreen)