//
import React from 'react';
import { COLORS } from '../../theme/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Devider from '../Devider';
import CustomButton from '../CustomBtn';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
//
const BookedFutsalCards = ({ id, futsalName, distance, address, campacity, price, courtName, imageUrl }) => {
    const { navigate } = useNavigation();
    //
    const onCancelBooking = () => {
        navigate("BookedFutsalsStack", {
            initial: false,
            screen: "CancelBooking",
            params: {
                id, futsalName, distance, address, campacity, price, courtName, imageUrl
            }
        })
    }
    //
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.imageCon}>
                    <Image
                        source={imageUrl}
                        resizeMode="cover"
                        style={{ width: '100%', height: 90, borderRadius: 7 }}
                    />
                </View>
                <View style={styles.contentCon}>
                    {/* futsal name and hear icon container */}
                    <View style={styles.rowCon}>
                        <Text style={styles.headingTxt}>
                            {futsalName}
                        </Text>
                        <Pressable>
                            <MaterialCommunityIcons name="checkbox-multiple-marked-outline" size={20} color={COLORS.primary_color} />
                        </Pressable>
                    </View>
                    {/* distance and address and distance between icon container */}
                    <View style={[styles.rowCon, { columnGap: 3, justifyContent: 'flex-start' }]}>
                        <MaterialCommunityIcons name="map-marker-distance" size={12} />
                        <Text style={styles.paragraphTxt}>
                            {distance} | {address}
                        </Text>
                    </View>
                    {/* campacity and price per hour container */}
                    <View style={[styles.rowCon]}>
                        <Text style={styles.priceText}>
                            {price} per hour
                        </Text>
                    </View>
                </View>
            </View>
            <Devider height={12} />
            <View style={styles.rowCon}>
                <Text style={styles.courtText}>
                    {courtName}
                </Text>
                <View style={styles.campacityCon}>
                    <Text style={styles.campacityText}>
                        {campacity}
                    </Text>
                </View>
                <View style={styles.dateCon}>
                    <AntDesign name="calendar" />
                    <Text style={styles.dateText}>
                        12 Feb,2023
                    </Text>
                </View>
            </View>
            <Devider height={12} />
            {/* Controls Container */}
            <View style={styles.controlsCon}>
                <IconButton
                    size={25}
                    icon="close"
                    style={styles.unBookBtn}
                    onPress={onCancelBooking}
                />
                <CustomButton title="View Booking Details" style={styles.bookingBtn} color={COLORS.primary_color} />
            </View>
        </View>
    )
}
//
export default BookedFutsalCards;
//
const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        padding: '4%',
        borderRadius: 7,
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
        backgroundColor: COLORS.bg_primary,
    },
    container: {
        flexDirection: 'row',
        columnGap: 10,
    },
    imageCon: {
        flex: 0.5,
        borderRadius: 7,
        backgroundColor: COLORS.light_green_color
    },
    contentCon: {
        flex: 1,
        rowGap: 10,
        height: 90,
        paddingVertical: '1%',
        justifyContent: 'space-between',
        // backgroundColor: COLORS.tertiary_color
    },
    rowCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingTxt: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: COLORS.black900
    },
    paragraphTxt: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: COLORS.black800
    },
    bookingBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.primary_color,
        backgroundColor: COLORS.bg_primary,
    },
    priceText: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: COLORS.primary_color
    },
    campacityCon: {
        borderRadius: 50,
        paddingVertical: "1.5%",
        paddingHorizontal: '4%',
        backgroundColor: COLORS.black600
    },
    campacityText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: COLORS.black800,
        textTransform: 'uppercase'
    },
    courtText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black800
    },
    dateCon: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5
    },
    dateText: {
        fontSize: 12,
        color: COLORS.black800
    },
    controlsCon: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    unBookBtn: {
        borderRadius: 5,
        backgroundColor: "#FAB5B5"
    }
})
//
