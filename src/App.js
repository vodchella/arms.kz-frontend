import React from 'react'
import { StatusBar } from 'react-native'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleProvider } from 'native-base'
import ReduxNavigator from './components/navigators/ReduxNavigator'
import nav from './redux/navigation/Reducers'
import exercises from './redux/exercises/Reducers'
import ui from './redux/ui/Reducers'
import getTheme from './styles/native-base-theme/components';
import themeArms from './styles/native-base-theme/variables/arms'


const rootReducer = combineReducers({
    nav,
    exercises,
    ui,
})
const store = createStore(rootReducer)


const App = () => {
    return (
        <Provider store={store}>
            <StatusBar barStyle='dark-content' />
            <StyleProvider style={getTheme(themeArms)}>
                <ReduxNavigator />
            </StyleProvider>
        </Provider>
    )
}

export default App;
