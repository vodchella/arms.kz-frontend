import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native'
import { Thumbnail, Text } from 'native-base'
import { DrawerItems } from 'react-navigation-drawer'
import * as Colors from '../constants/Colors'

class DrawerContainer extends Component {
    render() {
        const { googleUserInfo } = this.props
        return (
            <ScrollView style={{ backgroundColor: Colors.BACKGROUND }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Thumbnail
                            large
                            source={{ uri: googleUserInfo.user.photo }}
                            style={{
                                width: 150,
                                height: 150,
                                marginTop: 30,
                                marginBottom: 10,
                            }}
                        />
                        <Text note>{googleUserInfo.user.name}</Text>
                        <Text note>{googleUserInfo.user.email}</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <DrawerItems
                            {...this.props}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    googleUserInfo: state.auth.googleUserInfo,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)
