import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import IconForButton from './IconForButton'
import ROUTE_PROPS from '../constants/RouteProps'

const HeaderComponent = ({ props }) => {
    const { navigation } = props
    const { routes, index } = navigation.state
    console.log(routes[index].routeName)
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Button
                rounded
                onPress={() => {
                    navigation.toggleDrawer()
                }}
            >
                <IconForButton name='menu' />
            </Button>
            <Text style={{ fontSize: 22, paddingLeft: 10 }}>
                {ROUTE_PROPS[routes[index].routeName].title}
            </Text>
        </View>
    )
}

export default HeaderComponent