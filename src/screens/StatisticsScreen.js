import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'
import styles from '../styles'

const StatisticsScreen = () => {
    return (<>
        <SafeAreaView style={{ height: '100%' }}>
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Статистика</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>)
}

export default StatisticsScreen