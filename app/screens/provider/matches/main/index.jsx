import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import VenueHeader from '../../venues/components/header'
import MatchesTopTabs from '../components/matchesTopTabs'
import { SafeAreaView } from 'react-native-safe-area-context'

const MatchesMain = () => {
    return (
        <View style={styles.container}>
            <VenueHeader title='Matches' showSearchIcon={false} />
            <MatchesTopTabs />
        </View>
    )
}

export default MatchesMain

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})