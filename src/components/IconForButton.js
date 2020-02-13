import React from 'react'
import { Icon } from 'native-base'
import * as Colors from '../constants/Colors'

const IconForButton = (props) => {
    const color = props.onTransparent ? Colors.ON_BACKGROUND : Colors.ON_PRIMARY
    return (<Icon {...props} style={{ color }} />)
}

export default IconForButton
