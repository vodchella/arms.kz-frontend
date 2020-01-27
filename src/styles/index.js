import { StyleSheet } from 'react-native'
import * as Colors from '../constants/Colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: Colors.BACKGROUND,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.BACKGROUND,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.ON_BACKGROUND,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.ON_BACKGROUND,
    },
    highlight: {
        fontWeight: '700',
    },
})

export default styles