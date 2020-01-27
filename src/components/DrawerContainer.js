import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    Text,
    Image,
} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import * as Colors from '../constants/Colors'

const DrawerContainer = (props) => {
    return(
        <ScrollView
            style={{ backgroundColor: Colors.BACKGROUND }}
        >
            <SafeAreaView
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <Image
                    style={{ alignSelf: 'center' }}
                    source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
                />
                <DrawerItems
                    {...props}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

export default DrawerContainer