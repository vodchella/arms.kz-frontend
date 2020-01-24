import React from 'react'
import { StatusBar } from 'react-native'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { connect, Provider } from 'react-redux'
import WelcomeScreen from './screens/WelcomeScreen'
import WorkoutsScreen from './screens/WorkoutsScreen'
import StatisticsScreen from './screens/StatisticsScreen'
import DrawerContainer from './components/DrawerContainer'
import Header from './components/Header'


const DrawerNavigation = createDrawerNavigator({
    WorkoutsScreen: { screen: WorkoutsScreen, navigationOptions: { title: 'Тренировки' } },
    StatisticsScreen: { screen: StatisticsScreen, navigationOptions: { title: 'Статистика' } },
    WelcomeScreen: { screen: WelcomeScreen, navigationOptions: { title: 'Об arms.kz' } },
}, {
    headerMode: 'float',
    initialRouteName: 'WelcomeScreen',
    contentComponent: DrawerContainer,
    drawerType: 'front',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {backgroundColor: '#4C3E54'},
        headerTitle: () => <Header props={{navigation}}/>,
        headerTintColor: 'white',
    })
})

const AppNavigation = createStackNavigator({
    DrawerStack: { screen: DrawerNavigation },
}, {
    initialRouteName: 'DrawerStack'
})
const AppContainer = createAppContainer(AppNavigation)

const mapStateToProps = state => ({ nav: state.nav })
const ReduxNavigation = connect(mapStateToProps)(AppContainer)

const navReducer = (state, action) => {
    const newState = AppNavigation.router.getStateForAction(action, state)
    return newState || state
}

const createStoreFn = () => {
    const rootReducer = combineReducers({
        nav: navReducer
    })
    return createStore(rootReducer)
}
const store = createStoreFn()




const App = () => {
    return (
        <Provider store={store}>
            <StatusBar barStyle='dark-content' />
            <ReduxNavigation />
        </Provider>
    )
}

export default App;