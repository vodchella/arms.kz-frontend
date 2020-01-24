import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { connect, Provider } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const WelcomeScreen = () => {
    return (<>
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Arms.kz</Text>
                        <Text style={styles.sectionDescription}>
                            Скоро <Text style={styles.highlight}>Arms.kz</Text> обрастёт функционалом,
                            оставайтесь с нами!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>)
}

const WorkoutsScreen = () => {
    return (<>
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Тренировки</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>)
}

const StatisticsScreen = () => {
    return (<>
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Статистика</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>)
}

const DrawerContainer = (props) => {
    return(
        <ScrollView>
            <SafeAreaView
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <Text>Arms.kz</Text>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    )
}

const Header = ({ props }) => {
    const { navigation } = props
    return (<>
        <Text
            style={{padding: 5, color: 'white'}}
            onPress={() => {
                navigation.toggleDrawer()
            }}
        >
            Menu
        </Text>
    </>)
}



const DrawerNavigation = createDrawerNavigator({
    WorkoutsScreen: { screen: WorkoutsScreen, navigationOptions: { title: 'Тренировки' } },
    StatisticsScreen: { screen: StatisticsScreen, navigationOptions: { title: 'Статистика' } },
    WelcomeScreen: { screen: WelcomeScreen, navigationOptions: { title: 'Об arms.kz' } },
}, {
    headerMode: 'float',
    initialRouteName: 'WelcomeScreen',
    contentComponent: DrawerContainer,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
