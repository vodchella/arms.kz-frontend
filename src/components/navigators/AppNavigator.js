import { createStackNavigator } from 'react-navigation-stack'
import DrawerNavigator from './DrawerNavigator'
import * as RouteNames from '../../constants/RouteNames'
import WelcomeScreen from '../../screens/WelcomeScreen'
import ROUTE_PROPS from '../../constants/RouteProps'

const AppNavigator = createStackNavigator({
    DrawerStack: { screen: DrawerNavigator },
    [RouteNames.WELCOME]: {
        screen: WelcomeScreen,
        navigationOptions: {
            title: ROUTE_PROPS[RouteNames.WELCOME].title,
            headerShown: false,
        }
    },
}, {
    initialRouteName: RouteNames.WELCOME
})

export default AppNavigator
