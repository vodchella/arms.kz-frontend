import { StyleSheet } from 'react-native'
import * as Colors from '../constants/Colors'

const styles = StyleSheet.create({
    swipeRowFront: {
        backgroundColor: Colors.SURFACE,
        borderBottomColor: Colors.BACKGROUND,
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 60,
    },
    swipeRowBack: {
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
    },
})

export default styles
