import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator';
import { customStepperStyles } from '../../../../../utilities'
import BasicVenueData from '../steps/basicVenueData';
import VenueAddressData from '../steps/venueAddressData';
import VenueMap from '../steps/venueMap';
import VenueImages from '../steps/venueImages';

const VenueRegistrationSteps = ({ venueRegistrationRef }) => {
    const [currentPosition, setCurrentPosition] = useState(0)
    const labels = ["Basic", "Address", "Map", "Images"];
    const handlePosition = (position) => {
        setCurrentPosition(position)
    }
    const VenueRegistrationComponents = new Map()
    VenueRegistrationComponents.set(0, <BasicVenueData setCurrentPosition={setCurrentPosition} />)
    VenueRegistrationComponents.set(1, <VenueAddressData setCurrentPosition={setCurrentPosition} />)
    VenueRegistrationComponents.set(2, <VenueMap setCurrentPosition={setCurrentPosition} />)
    VenueRegistrationComponents.set(3, <VenueImages venueRegistrationRef={venueRegistrationRef} setCurrentPosition={setCurrentPosition} />)
    return (
        <View style={styles.container}>
            <StepIndicator
                stepCount={4}
                // onPress={handlePosition}
                customStyles={customStepperStyles}
                currentPosition={currentPosition}
                labels={labels}
            />
            {
                currentPosition == 0 ? VenueRegistrationComponents.get(0)
                    : currentPosition == 1 ? VenueRegistrationComponents.get(1)
                        : currentPosition == 2 ? VenueRegistrationComponents.get(2)
                            : currentPosition == 3 && VenueRegistrationComponents.get(3)
            }
        </View>
    )
}

export default VenueRegistrationSteps

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        rowGap: 18
    }
})