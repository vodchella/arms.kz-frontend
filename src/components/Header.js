import React from 'react'
import { Button, Icon } from 'native-base'

const HeaderComponenet = ({ props }) => {
    const { navigation } = props
    return (<>
        <Button
            transparent
            onPress={() => {
                navigation.toggleDrawer()
            }}
        >
            <Icon name='menu' />
        </Button>
    </>)
}

export default HeaderComponenet