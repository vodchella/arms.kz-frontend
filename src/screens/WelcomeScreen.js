import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'
import styles from '../styles'

const WelcomeScreen = () => {
    return (<>
        <SafeAreaView style={{ height: '100%' }}>
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Arms.kz</Text>
                        <Text style={styles.sectionDescription}>
                            Скоро <Text style={styles.highlight}>Arms.kz</Text> обрастёт функционалом,
                            оставайтесь с нами!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>)
}

export default WelcomeScreen