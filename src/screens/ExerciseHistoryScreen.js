import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, ListItem, Text, Body } from 'native-base'
import * as RNLocalize from 'react-native-localize'
import { formatDate } from '../utils/Dates'
import Waiting from '../components/Waiting'
import * as Colors from '../constants/Colors'

class ExerciseHistoryScreen extends Component {
    render() {
        const { info, history, isExerciseHistoryLoading } = this.props
        const timeZone = RNLocalize.getTimeZone()
        return (
            <Container style={{ backgroundColor: Colors.SURFACE }}>
                {isExerciseHistoryLoading && (
                    <Waiting />
                )}
                {!isExerciseHistoryLoading && (
                    <Content>
                        <List>
                            <ListItem itemDivider>
                                <Text>{info.caption}</Text>
                            </ListItem>
                            {history.map(h => (
                                <ListItem key={h.workout_id}>
                                    <Body>
                                        {h.bh_weight == null && (<>
                                            <Text>{`Левая ${h.lh_weight} кг. / ${h.lh_value} повт.`}</Text>
                                            <Text>{`Правая ${h.rh_weight} кг. / ${h.rh_value} повт.`}</Text>
                                        </>)}
                                        {h.bh_weight != null && (
                                            <Text>{`${h.bh_weight} кг. / ${h.bh_value} повт.`}</Text>
                                        )}
                                        <Text note>{formatDate(h.workout_date, timeZone)}</Text>
                                    </Body>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isExerciseHistoryLoading: state.ui.isExerciseHistoryLoading,
    info: state.ui.exerciseHistoryInfo,
    history: state.exercises.history,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseHistoryScreen)