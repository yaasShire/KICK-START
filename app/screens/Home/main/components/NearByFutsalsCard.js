//
import React from 'react';
import { BlurView } from 'expo-blur';
import { appLayout, COLORS } from '../../../../theme/globalStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
//
const { width, height } = Dimensions.get('screen');
//
const NearByFutsalsCard = ({ id, futsalName, distance, address, campacity, price, imageUrl }) => {
    return (
        <ImageBackground source={imageUrl} resizeMode="cover" style={styles.container}>
            <View intensity={Platform.OS == "android" ? 80 : 60} tint="dark" style={styles.blurViewCon}>
                <Text style={styles.futsalName}>
                    {futsalName}
                </Text>
                <View style={[styles.rowCon, { columnGap: 1, justifyContent: 'flex-start' }]}>
                    <View>
                        <MaterialCommunityIcons name="map-marker-distance" size={12} color="#ffffff" />
                    </View>
                    <Text style={styles.address}>
                        {distance} | {address}
                    </Text>
                </View>
                <View style={styles.rowCon}>
                    <Text style={styles.price}>
                        {campacity}
                    </Text>
                    <Text style={styles.price}>
                        {price}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    )
}
//
export default NearByFutsalsCard;
//
const styles = StyleSheet.create({
    container: {
        height: height / 6,
        borderRadius: 10,
        width: width / 1.7,
        overflow: 'hidden',
        paddingBottom: '3%',
        justifyContent: 'flex-end'
    },
    blurViewCon: {
        rowGap: 5,
        width: '90%',
        padding: '3%',
        borderRadius: 5,
        marginLeft: '5%',
        marginBottom: '2.5%',
        overflow: 'hidden',
        borderWidth: 0.3,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: COLORS.light_green_color,
    },
    rowCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    futsalName: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.7,
        color: "#ffffff",
        opacity: 99,
    },
    address: {
        opacity: 99,
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.7,
        color: COLORS.bg_secondary,
    },
    price: {
        opacity: 99,
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.7,
        color: "#ffffff",
    },
})
//