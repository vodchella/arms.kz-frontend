import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = createStackNavigator({
    DrawerStack: { screen: DrawerNavigator },
}, {
    initialRouteName: 'DrawerStack'
})

export default AppNavigator