import React from 'react'
import { NavigationActions } from 'react-navigation'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import IconForButton from './IconForButton'
import ROUTE_PROPS from '../constants/RouteProps'

const HeaderComponent = ({ props }) => {
    const { navigation } = props
    const { routes, index } = navigation.state
    const route = routes[index]
    let routeName = route.routeName
    let action = navigation.toggleDrawer
    let icon = 'menu'
    if (route.index != undefined) {
        routeName = route.routes[route.index].routeName
        action = route.index === 0 ? navigation.toggleDrawer : () => { navigation.dispatch(NavigationActions.back()) }
        icon = route.index === 0 ? 'menu' : 'arrow-back'
    }
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Button
                rounded
                onPress={action}
            >
                <IconForButton name={icon} />
            </Button>
            <Text style={{ fontSize: 22, paddingLeft: 10 }}>
                {ROUTE_PROPS[routeName].title}
            </Text>
        </View>
    )
}

export default HeaderComponent