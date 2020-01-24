import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    Text,
} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'

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

export default DrawerContainer