//
import React from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import venueImage from '../../../../../assets/images/Futsals/futsal1.jpeg'
import { calculateDistance } from '../../../../utilities';
import { useNavigation } from '@react-navigation/native';
//
const SearchingCard = ({ data = {}, location = {}, saveSearchedVenue = () => { } }) => {
    let distance = 0
    if (location?.latitude && location?.longitude) {
        distance = calculateDistance(location.latitude, location?.longitude, Number(data?.latitude), Number(data?.longitude));
    }

    return (
        <Pressable onPress={() => saveSearchedVenue(data)} style={styles.container}>
            <View style={styles.contentCon}>
                {/* Image */}
                <Image
                    source={venueImage}
                    resizeMode="cover"
                    style={{ width: 60, height: 60, borderRadius: 7 }}
                />
                {/* Contect Container */}
                <View style={styles.FutsalInfo}>
                    <Text style={styles.futsalName}>
                        {data?.name}
                    </Text>
                    <Text style={styles.distance}>
                        {distance?.toFixed(2)}km away for you
                    </Text>
                    <Text style={styles.address}>
                        {data?.address}
                    </Text>
                </View>
            </View>
            {/* icon */}
            <MaterialCommunityIcons name="replay" size={27} color={COLORS.black700} />
        </Pressable>
    )
}
//
export default SearchingCard;
//
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    contentCon: {
        flexDirection: "row",
        columnGap: 15
    },
    FutsalInfo: {
        rowGap: 2
    },
    futsalName: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.7,
        color: COLORS.black900
    },
    address: {
        fontSize: 13,
        letterSpacing: 0.7,
        color: COLORS.black800
    },
    distance: {
        fontSize: 13,
        letterSpacing: 0.7,
        color: COLORS.black800
    },
})
//