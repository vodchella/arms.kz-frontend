import React from 'react'
import { Text } from 'react-native'

const Header = ({ props }) => {
    const { navigation } = props
    return (<>
        <Text
            style={{padding: 5, color: 'white'}}
            onPress={() => {
                navigation.toggleDrawer()
            }}
        >
            Menu
        </Text>
    </>)
}

export default Header