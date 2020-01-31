import React from 'react'
import { Content } from 'native-base'
import Spinner from 'react-native-spinkit'
import * as Colors from '../constants/Colors'

const Waiting = () => {
    return (
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
            <Spinner type='ThreeBounce' style={{ color: Colors.PRIMARY, width: '100%' }}/>
        </Content>
    )
}

export default Waiting