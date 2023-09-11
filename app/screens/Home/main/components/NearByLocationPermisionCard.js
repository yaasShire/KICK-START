//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Devider } from '../../../../components';
import { COLORS } from '../../../../theme/globalStyle';
//
const NearByLocationPermisionCard = () => {
    const onTurnOnDeviceLocation = () => {
        alert("turn on your device location")
    }
    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                To view nearby futsals, please turn on your device location.
            </Text>
            <Devider height={13} />
            <Text onPress={onTurnOnDeviceLocation} style={styles.textBtn}>
                Turn On Location
            </Text>
        </View>
    )
}
//
export default NearByLocationPermisionCard;
//
const styles = StyleSheet.create({
    container: {
        height: 130,
        padding: '5%',
        borderRadius: 7,
        marginHorizontal: '5%',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_primary,
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    message: {
        fontSize: 18,
        letterSpacing: 0.5,
        color: COLORS.black800
    },
    textBtn: {
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'right',
        letterSpacing: 0.5,
        color: COLORS.primary_color
    }
})
//