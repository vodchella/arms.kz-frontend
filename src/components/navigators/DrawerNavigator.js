import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import WelcomeScreen from '../../screens/WelcomeScreen'
import WorkoutsScreen from '../../screens/WorkoutsScreen'
import ExercisesScreen from '../../screens/ExercisesScreen'
import DrawerContainer from '../DrawerContainer'
import Header from '../Header'
import * as Colors from '../../constants/Colors'
import * as RouteNames from '../../constants/RouteNames'

const DrawerNavigator = createDrawerNavigator({
    [RouteNames.WORKOUTS]: { screen: WorkoutsScreen, navigationOptions: { title: 'Тренировки' } },
    [RouteNames.EXERCISES]: { screen: ExercisesScreen, navigationOptions: { title: 'Упражнения' } },
    [RouteNames.WELCOME]: { screen: WelcomeScreen, navigationOptions: { title: 'Об arms.kz' } },
}, {
    headerMode: 'float',
    initialRouteName: RouteNames.EXERCIES,
    contentComponent: DrawerContainer,
    drawerType: 'front',
    contentOptions: {
        activeTintColor: Colors.PRIMARY,
        inactiveTintColor: Colors.ON_BACKGROUND,
    },
    navigationOptions: ({ navigation }) => ({
        headerStyle: {backgroundColor: Colors.SURFACE},
        headerTitle: () => <Header props={{navigation}}/>,
        headerTintColor: Colors.ON_BACKGROUND,
    })
})

export default DrawerNavigator