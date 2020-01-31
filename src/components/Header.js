import React from 'react'
import { Button } from 'native-base'
import IconForButton from './IconForButton'

const HeaderComponent = ({ props }) => {
    const { navigation } = props
    const { routes, index } = navigation.state
    console.log(routes[index])
    return (<>
        <Button
            rounded
            onPress={() => {
                navigation.toggleDrawer()
            }}
        >
            <IconForButton name='menu' />
        </Button>
    </>)
}

export default HeaderComponent