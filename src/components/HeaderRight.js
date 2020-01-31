
import React from 'react'
import { View } from 'react-native'
import IconForButton from './IconForButton'
import ROUTE_PROPS from '../constants/RouteProps'

const HeaderRight = ({ props }) => {
    const { navigation } = props
    const { routes, index } = navigation.state
    console.log(ROUTE_PROPS[routes[index].routeName].rightHeader)
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
            {ROUTE_PROPS[routes[index].routeName].rightHeader}
        </View>
    )
}

export default HeaderRight