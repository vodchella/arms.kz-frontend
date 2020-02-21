import React, { Component } from 'react'
import { View } from 'native-base'
import { TouchableHighlight } from 'react-native'
import styles from '../styles'
import * as Colors from '../constants/Colors'

class SwipeListItem extends Component {
    render() {
        const { children, onPress, large } = this.props
        const height = large === true ? 90 : styles.swipeRowFront.height
        return (
            <TouchableHighlight
                onPress={onPress}
                style={{
                    ...styles.swipeRowFront,
                    height
                }}
                underlayColor={Colors.BACKGROUND}
            >
                <View style={{ marginLeft: 30 }}>
                    {children}
                </View>
            </TouchableHighlight>
        )
    }
}

export default SwipeListItem
