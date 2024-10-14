import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import VenueRegistrationOnBoarding from '../venueRegistrationOnBoarding'
import VenueRegistrationSteps from '../venueRegistrationSteps'

const VenueRegistration = ({ venueRegistrationRef }) => {
    const [showSteps, setShowSteps] = useState(false)
    return (
        <View style={styles.container}>
            {
                // showSteps ? 
                <VenueRegistrationSteps venueRegistrationRef={venueRegistrationRef} />
                // : <VenueRegistrationOnBoarding setShowSteps={setShowSteps} />
            }
        </View>
    )
}

export default VenueRegistration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})