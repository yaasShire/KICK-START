//
import React from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import { Image, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const SearchingCard = ({ id, futsalName, distance, address, imageUrl }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentCon}>
                {/* Image */}
                <Image
                    source={imageUrl}
                    resizeMode="cover"
                    style={{ width: 60, height: 60, borderRadius: 7 }}
                />
                {/* Contect Container */}
                <View style={styles.FutsalInfo}>
                    <Text style={styles.futsalName}>
                        {futsalName}
                    </Text>
                    <Text style={styles.distance}>
                        {distance} away for you
                    </Text>
                    <Text style={styles.address}>
                        {address}
                    </Text>
                </View>
            </View>
            {/* icon */}
            <MaterialCommunityIcons name="replay" size={27} color={COLORS.black700} />
        </View>
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