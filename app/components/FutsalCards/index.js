//
import React from 'react';
import Devider from '../Devider';
import CustomBtn from '../CustomBtn';
import { COLORS } from '../../theme/globalStyle';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const FutsalCards = ({ id, futsalName, distance, address, campacity, price, imageUrl }) => {
    const { navigate } = useNavigation();
    const onBookNow = () => {
        navigate('FutsalsStack', {
            screen: 'Details',
            initial: false,
            params: {
                id, futsalName, distance, address, campacity, price, imageUrl
            }
        })
    }
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
                            <AntDesign name="hearto" size={20} color={COLORS.primary_color} />
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
                        <View style={styles.campacityCon}>
                            <Text style={styles.campacityText}>
                                {campacity}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Devider />
            <CustomBtn
                title="Book Now"
                onClickHandler={onBookNow}
                style={styles.bookingBtn} color={COLORS.primary_color}
            />
        </View>
    )
}
//
export default FutsalCards;
//
const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        padding: '4%',
        borderRadius: 7,
        shadowColor: COLORS.black800,
        shadowOffset: {
            width: 2,
            height: 2,
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
        fontWeight: '800',
        letterSpacing: 0.5,
        color: COLORS.black800,
        textTransform: 'uppercase'
    },
})
//
