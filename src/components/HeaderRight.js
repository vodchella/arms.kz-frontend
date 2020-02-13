import React from 'react'
import { View } from 'react-native'
import ROUTE_PROPS from '../constants/RouteProps'

const HeaderRight = ({ props }) => {
    const { navigation } = props
    const { routes, index } = navigation.state
    const route = routes[index]
    let routeName = route.routeName
    if (route.index !== undefined) {
        routeName = route.routes[route.index].routeName
    }
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
            {ROUTE_PROPS[routeName].rightHeader}
        </View>
    )
}

export default HeaderRight
