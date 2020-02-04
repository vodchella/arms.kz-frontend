import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import WelcomeScreen from '../../screens/WelcomeScreen'
import WorkoutsScreen from '../../screens/WorkoutsScreen'
import ExercisesScreen from '../../screens/ExercisesScreen'
import ExerciseHistoryScreen from '../../screens/ExerciseHistoryScreen'
import DrawerContainer from '../DrawerContainer'
import Header from '../Header'
import HeaderRight from '../HeaderRight'
import * as Colors from '../../constants/Colors'
import * as RouteNames from '../../constants/RouteNames'
import ROUTE_PROPS from '../../constants/RouteProps'

const exercisesStack = createStackNavigator({
    [RouteNames.EXERCISES]: {
        screen: ExercisesScreen,
        navigationOptions: {
            title: ROUTE_PROPS[RouteNames.EXERCISES].title
        }
    },
    [RouteNames.EXERCISE_HISTORY]: {
        screen: ExerciseHistoryScreen,
        navigationOptions: {
            title: ROUTE_PROPS[RouteNames.EXERCISE_HISTORY].title
        }
    },
}, {
    headerMode: 'none',
    initialRouteName: RouteNames.EXERCISES,
})

const DrawerNavigator = createDrawerNavigator({
    [RouteNames.WORKOUTS]: {
        screen: WorkoutsScreen,
        navigationOptions: {
            title: ROUTE_PROPS[RouteNames.WORKOUTS].title
        }
    },
    [RouteNames.EXERCISES]: {
        screen: exercisesStack,
        navigationOptions: {
            title: ROUTE_PROPS[RouteNames.EXERCISES].title
        }
    },
    [RouteNames.WELCOME]: {
        screen: WelcomeScreen,
        navigationOptions: {
            title: ROUTE_PROPS[RouteNames.WELCOME].title
        }
    },
}, {
    headerMode: 'float',
    initialRouteName: RouteNames.EXERCISES,
    contentComponent: DrawerContainer,
    drawerType: 'front',
    contentOptions: {
        activeTintColor: Colors.PRIMARY,
        inactiveTintColor: Colors.ON_BACKGROUND,
    },
    navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.SURFACE },
        headerTitle: () => <Header props={{ navigation }}/>,
        headerRight: () => <HeaderRight props={{ navigation }}/>,
        headerTintColor: Colors.ON_BACKGROUND,
    })
})

export default DrawerNavigator