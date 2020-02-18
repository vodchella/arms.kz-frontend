import React, { Component } from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { Image } from 'react-native'
import { Container, Content } from 'native-base'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin'
import Spinner from 'react-native-spinkit'
import arms from '../connectors/Arms'
import * as auth from '../redux/auth'
import * as Colors from '../constants/Colors'

class WelcomeScreen extends Component {
    state = {
        userInfo: null,
        gettingLoginStatus: true,
    }

    componentDidMount() {
        setTimeout(() => {
            this.loadTokensFromStore().then((tokens) => {
                console.log('Try auth with token from store: ', tokens.auth)
                arms.checkToken(tokens.auth, (userInfo) => {
                    console.log('User info from Arms: ', JSON.stringify(userInfo))
                    this.updateUserInfo(userInfo)
                    this.setState({ gettingLoginStatus: false })
                    this.go()
                    console.log('Auth token Ok')
                }, () => {
                    console.log('Auth token failed, trying to refresh: ', tokens.refresh)
                    arms.refreshToken(tokens.refresh, (newTokens) => {
                        const { setTokens } = this.props
                        setTokens(newTokens)
                        this.saveTokensToStore(newTokens)
                        arms.checkToken(newTokens.auth, (info) => {
                            this.updateUserInfo(info)
                            this.setState({ gettingLoginStatus: false })
                        }, () => {
                            this.setState({ gettingLoginStatus: false })
                        })
                        console.log('Refresh token Ok')
                    }, () => {
                        console.log('Refresh token failed, trying to signin by Google')
                        this.checkGoogleUserIsSignedIn()
                    })
                })
            }).catch(() => {
                console.log('No tokens in store, trying to signin by Google')
                this.checkGoogleUserIsSignedIn()
            })
        }, 2000)
    }

    getCurrentGoogleUserInfo = async () => {
        try {
            const googleUserInfo = await GoogleSignin.signInSilently()
            this.signInArms(googleUserInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in Google yet')
            } else {
                console.log('Something went wrong. Unable to get user\'s info')
            }
        }
    }

    updateUserInfo = (userInfo) => {
        const { setGoogleUserInfo } = this.props
        setGoogleUserInfo({
            user: {
                ...userInfo,
                photo: userInfo.picture,
            }
        })
    }

    checkGoogleUserIsSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn()
        if (isSignedIn) {
            this.getCurrentGoogleUserInfo()
        }
        this.setState({ gettingLoginStatus: false })
    }

    saveTokensToStore = async (tokens) => {
        try {
            await AsyncStorage.setItem('tokens', JSON.stringify(tokens))
        } catch (e) {
            console.log('Can\'t save tokens to storage')
        }
    }

    loadTokensFromStore = async () => {
        try {
            const tokensString = await AsyncStorage.getItem('tokens')
            const tokens = JSON.parse(tokensString)
            const { setTokens } = this.props
            setTokens(tokens)
            console.log('Tokens from store --> ', tokens)
            return tokens
        } catch (e) {
            console.log('Can\'t load tokens from storage')
        }
    }

    signInArms = async (googleUserInfo) => {
        const { idToken: googleToken } = googleUserInfo
        const { setTokens, setGoogleUserInfo } = this.props
        const tokensOk = (tokens) => {
            setTokens(tokens)
            this.saveTokensToStore(tokens)
            setGoogleUserInfo(googleUserInfo)
            console.log('Google User Info --> ', googleUserInfo)
        }
        arms.signInByGoogleToken(googleToken, (tokens) => {
            tokensOk(tokens)
            this.go()
            console.log('Sign in Arms ok')
        }, ({ error }) => {
            // TODO: special error code for this situation on backend
            if (error.code === -32002 && error.message === 'Пользователь заблокирован') {
                console.log('You are blocked!')
            } else {
                console.log('Sign in Arms failed, trying to register')
                arms.registerByGoogleToken(googleToken, (tokens) => {
                    tokensOk(tokens)
                    console.log('Register in Arms ok')
                }, () => {
                    setTokens(null)
                    console.log('Register in Arms failed')
                })
            }
        })
    }

    signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            })
            const googleUserInfo = await GoogleSignin.signIn()
            this.signInArms(googleUserInfo)
        } catch (error) {
            console.log('Message', error.message)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated')
            } else {
                console.log('Some Other Error Happened')
            }
        }
    }

    signOutGoogle = async () => {
        const { setGoogleUserInfo, setTokens } = this.props
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            setGoogleUserInfo(null)
            setTokens(null)
            this.saveTokensToStore(null)
        } catch (error) {
            console.error(error)
        }
    }

    go = () => {
        const { navigation } = this.props
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'DrawerStack' }),
            ],
        })
        navigation.dispatch(resetAction)
    }

    render() {
        const { gettingLoginStatus } = this.state
        const { googleUserInfo } = this.props
        return (<Container style={{ backgroundColor: Colors.SURFACE }}>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <Image
                    style={{ alignSelf: 'center', marginBottom: 10 }}
                    source={
                        require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')
                    }
                />
                {gettingLoginStatus && (
                    <Spinner
                        type='ThreeBounce'
                        style={{ color: Colors.PRIMARY, width: '100%', marginBottom: 50 }}
                    />
                )}
                {(googleUserInfo === null && !gettingLoginStatus) && (
                    <GoogleSigninButton
                        style={{ alignSelf: 'center' }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Auto}
                        onPress={this.signInGoogle}
                    />
                )}
            </Content>
        </Container>)
    }
}

const mapStateToProps = state => ({
    googleUserInfo: state.auth.googleUserInfo,
    tokens: state.auth.tokens,
})

const mapDispatchToProps = {
    setGoogleUserInfo: auth.setGoogleUserInfo,
    setTokens: auth.setTokens,
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
