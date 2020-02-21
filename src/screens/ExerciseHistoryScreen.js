import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, ListItem, Text, View } from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'
import * as RNLocalize from 'react-native-localize'
import { formatDate } from '../utils/Dates'
import Waiting from '../components/Waiting'
import * as Colors from '../constants/Colors'
import SwipeListItem from '../components/SwipeListItem'

const stub = () => {}

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
                    <View style={{ flex: 1 }}>
                        <ListItem key='first_key' itemDivider>
                            <Text>{info.caption}</Text>
                        </ListItem>
                        <SwipeListView
                            data={history}
                            renderItem={({ item: h }) => (
                                <SwipeListItem large>
                                    {h.bh_weight == null && (<>
                                        <Text>
                                            {`Левая ${h.lh_weight} кг. / ${h.lh_value} повт.`}
                                        </Text>
                                        <Text>
                                            {`Правая ${h.rh_weight} кг. / ${h.rh_value} повт.`}
                                        </Text>
                                    </>)}
                                    {h.bh_weight != null && (
                                        <Text>
                                            {`${h.bh_weight} кг. / ${h.bh_value} повт.`}
                                        </Text>
                                    )}
                                    <Text note>{formatDate(h.workout_date, timeZone)}</Text>
                                </SwipeListItem>
                            )}
                            keyExtractor={stub}
                        />
                    </View>
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
