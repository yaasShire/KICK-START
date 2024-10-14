import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CourtRegistrationSteps from '../courtRegistrationSteps'

const CourtRegistration = ({ courtId = "", courtRegistrationRef, venueId = "", getVenueCourts = () => { }, updateCourt = false }) => {
    return (
        <View style={styles.container}>
            <CourtRegistrationSteps courtId={courtId} updateCourt={updateCourt} courtRegistrationRef={courtRegistrationRef} venueId={venueId} getVenueCourts={getVenueCourts} />
        </View>
    )
}

export default CourtRegistration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})