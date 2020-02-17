import React, { Component } from 'react'
import 'moment/locale/ru'
import moment from 'moment-timezone'
import { StatusBar } from 'react-native'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { StyleProvider } from 'native-base'
import { GoogleSignin } from 'react-native-google-signin'
import { GOOGLE_CLIENT_ID } from 'react-native-dotenv'
import ReduxNavigator from './components/navigators/ReduxNavigator'
import nav from './redux/navigation/Reducers'
import exercises from './redux/exercises/Reducers'
import ui from './redux/ui/Reducers'
import auth from './redux/auth/Reducers'
import getTheme from './styles/native-base-theme/components'
import themeArms from './styles/native-base-theme/variables/arms'

const rootReducer = combineReducers({
    nav,
    exercises,
    ui,
    auth,
})
const store = createStore(rootReducer, applyMiddleware(thunk))

moment.locale('ru')

class App extends Component {
    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['profile', 'email'],
            webClientId: GOOGLE_CLIENT_ID,
            offlineAccess: true,
            forceConsentPrompt: true,
        })
    }

    render() {
        return (
            <Provider store={store}>
                <StatusBar barStyle='dark-content' />
                <StyleProvider style={getTheme(themeArms)}>
                    <ReduxNavigator />
                </StyleProvider>
            </Provider>
        )
    }
}

export default App
