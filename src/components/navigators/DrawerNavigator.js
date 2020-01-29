import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import WelcomeScreen from '../../screens/WelcomeScreen'
import WorkoutsScreen from '../../screens/WorkoutsScreen'
import ExercisesScreen from '../../screens/ExercisesScreen'
import DrawerContainer from '../DrawerContainer'
import Header from '../Header'
import * as Colors from '../../constants/Colors'

const DrawerNavigator = createDrawerNavigator({
    WorkoutsScreen: { screen: WorkoutsScreen, navigationOptions: { title: 'Тренировки' } },
    ExercisesScreen: { screen: ExercisesScreen, navigationOptions: { title: 'Упражнения' } },
    WelcomeScreen: { screen: WelcomeScreen, navigationOptions: { title: 'Об arms.kz' } },
}, {
    headerMode: 'float',
    initialRouteName: 'ExercisesScreen',
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