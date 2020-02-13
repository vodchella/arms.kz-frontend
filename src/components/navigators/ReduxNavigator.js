import { createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigator from './AppNavigator'

const AppContainer = createAppContainer(AppNavigator)
const mapStateToProps = state => ({ nav: state.nav })
const ReduxNavigator = connect(mapStateToProps)(AppContainer)

export default ReduxNavigator
