import React from 'react'
import { Button } from 'native-base'
import IconForButton from './IconForButton'

const HeaderComponenet = ({ props }) => {
    const { navigation } = props
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

export default HeaderComponenet