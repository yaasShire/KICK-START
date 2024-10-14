import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { LAY_OUT } from '../../../../../../theme/globalStyle';
import VenueLocationPicker from './VenueLocationPicker';
import { useSelector } from 'react-redux';

export default function VenueMap({ setCurrentPosition = () => { } }) {
    // 
    const venueCoordinate = useSelector(state => state?.venueSlice?.venueRegistration?.coordinate)
    const isDisabled = (venueCoordinate?.latitude && venueCoordinate?.longitude) ? false : true
    console.log('====================================');
    console.log(venueCoordinate);
    console.log('====================================');
    return (
        <View style={styles.container}>
            <VenueLocationPicker />
            <View style={styles.btns}>
                <Button mode='contained-tonal' style={{ padding: 3 }} onPress={() => setCurrentPosition(1)}>Prev</Button>
                <Button disabled={isDisabled} mode='contained' style={{ padding: 3 }} onPress={() => setCurrentPosition(3)}>Next</Button>
            </View>
        </View>
    );
}

// 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    btns: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        bottom: 20,
        paddingHorizontal: LAY_OUT.paddingX,
        width: "100%"
    }
});
