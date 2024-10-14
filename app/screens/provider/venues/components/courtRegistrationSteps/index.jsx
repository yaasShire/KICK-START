import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator';
import { customStepperStyles } from '../../../../../utilities'
import BasicVenueData from '../steps/basicVenueData';
import VenueAddressData from '../steps/venueAddressData';
import VenueMap from '../steps/venueMap';
import VenueImages from '../steps/venueImages';
import BasicCourtData from '../courtComponentSteps/basicCourtData';
import CourtDimensions from '../courtComponentSteps/courtDimensions';
import CourtImages from '../courtComponentSteps/courtImages';

const CourtRegistrationSteps = ({ courtId = "", courtRegistrationRef, venueId = "", getVenueCourts = () => { }, updateCourt = false }) => {
    const [currentPosition, setCurrentPosition] = useState(0)
    // const labels = ["Basic", "Dimensions", "Images"];
    const labels = ["Basic", "Dimensions"];
    const handlePosition = (position) => {
        setCurrentPosition(position)
    }
    const VenueRegistrationComponents = new Map()
    VenueRegistrationComponents.set(0, <BasicCourtData setCurrentPosition={setCurrentPosition} />)
    VenueRegistrationComponents.set(1, <CourtDimensions courtId={courtId} updateCourt={updateCourt} setCurrentPosition={setCurrentPosition} courtRegistrationRef={courtRegistrationRef} venueId={venueId} getVenueCourts={getVenueCourts} />)
    // VenueRegistrationComponents.set(2, <CourtImages setCurrentPosition={setCurrentPosition} courtRegistrationRef={courtRegistrationRef} />)
    return (
        <View style={styles.container}>
            <StepIndicator
                stepCount={2}
                // onPress={handlePosition}
                customStyles={customStepperStyles}
                currentPosition={currentPosition}
                labels={labels}
            />
            {
                currentPosition == 0 ? VenueRegistrationComponents.get(0)
                    : currentPosition == 1 ? VenueRegistrationComponents.get(1)
                        : currentPosition == 2 ? VenueRegistrationComponents.get(2) : null
                // : currentPosition == 3 && VenueRegistrationComponents.get(3)
            }
        </View>
    )
}

export default CourtRegistrationSteps

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        rowGap: 18
    }
})