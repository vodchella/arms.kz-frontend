import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin'
import arms from '../connectors/Arms'
import * as auth from '../redux/auth'

class WelcomeScreen extends Component {
    state = {
        userInfo: null,
        gettingLoginStatus: true,
    }

    componentDidMount() {
        this.loadTokensFromStore().then((tokens) => {
            console.log('Try auth with token from store: ', tokens.auth)
            arms.checkToken(tokens.auth, (userInfo) => {
                console.log('User info from Arms: ', JSON.stringify(userInfo))
                this.updateUserInfo(userInfo)
                this.setState({ gettingLoginStatus: false })
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

    render() {
        if (this.state.gettingLoginStatus) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )
        }
        const { googleUserInfo } = this.props
        if (googleUserInfo != null) {
            return (
                <View style={styles.container}>
                    <Image
                        source={{ uri: googleUserInfo.user.photo }}
                        style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                        Name: {googleUserInfo.user.name}{' '}
                    </Text>
                    <Text style={styles.text}>
                        Email: {googleUserInfo.user.email}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={this.signOutGoogle}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    style={{ width: 312, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.signInGoogle}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 30,
    },
})

const mapStateToProps = state => ({
    googleUserInfo: state.auth.googleUserInfo,
    tokens: state.auth.tokens,
})

const mapDispatchToProps = {
    setGoogleUserInfo: auth.setGoogleUserInfo,
    setTokens: auth.setTokens,
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
