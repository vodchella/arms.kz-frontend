import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    Text,
    Image,
} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'

const DrawerContainer = (props) => {
    return(
        <ScrollView>
            <SafeAreaView
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <Image
                    style={{ alignSelf: 'center' }}
                    source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
                />
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    )
}

export default DrawerContainer