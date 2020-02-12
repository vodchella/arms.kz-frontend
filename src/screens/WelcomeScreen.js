import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
// import styles from '../styles'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin'
import * as auth from '../redux/auth'

class WelcomeScreen extends Component {
    state = {
        userInfo: null,
        gettingLoginStatus: true,
    }

    componentDidMount() {
        this._isSignedIn();
    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            this._getCurrentUserInfo()
        } else {
            console.log('Please Login');
        }
        this.setState({ gettingLoginStatus: false });
    }
     
    _getCurrentUserInfo = async () => {
        const { setGoogleUserInfo } = this.props
        try {
            const googleUserInfo = await GoogleSignin.signInSilently();
            setGoogleUserInfo(googleUserInfo)
            console.log('User Info --> ', googleUserInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet')
            } else {
                console.log("Something went wrong. Unable to get user's info")
            }
        }
    }
     
    _signIn = async () => {
        const { setGoogleUserInfo } = this.props
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            })
            const googleUserInfo = await GoogleSignin.signIn()
            setGoogleUserInfo(googleUserInfo)
            console.log('User Info --> ', googleUserInfo)
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
    };
     
    _signOut = async () => {
        const { setGoogleUserInfo } = this.props
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            setGoogleUserInfo(null)
        } catch (error) {
            console.error(error)
        }
    }


    render() {
        if (this.state.gettingLoginStatus) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
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
                        <TouchableOpacity style={styles.button} onPress={this._signOut}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={styles.container}>
                        <GoogleSigninButton
                            style={{ width: 312, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this._signIn}
                        />
                    </View>
                )
            }
        }
    }

    // render() {
        // return (<>
        //     <SafeAreaView style={{ height: '100%' }}>
        //         <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
        //             <View style={styles.body}>
        //                 <View style={styles.sectionContainer}>
        //                     <Text style={styles.sectionTitle}>Arms.kz</Text>
        //                     <Text style={styles.sectionDescription}>
        //                         Скоро <Text style={styles.highlight}>Arms.kz</Text> обрастёт функционалом,
        //                         оставайтесь с нами!
        //                     </Text>
        //                 </View>
        //             </View>
        //         </ScrollView>
        //     </SafeAreaView>
        // </>)
    // }
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