//
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../../../theme/globalStyle';
import CustomButton from '../../../../components/CustomBtn';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import courtImage from '../../../../../assets/images/Futsals/futsal1.jpeg'
import AuthenticateModal from '../../../../components/authenticateModal';
import { useDispatch } from 'react-redux';
import { addBookingCourtId } from '../../../../redux/homeSlice'
//
const CourtsCard = ({ data = {}, venueId = 0, distance = 0, venueAddress = "", venueCity = "", isLoggedIn = false }) => {
    const { navigate } = useNavigation();
    const [authenticateModal, setAuthenticateModal] = useState(false)
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={styles.imageCon}>
                <Image
                    source={courtImage}
                    resizeMode="cover"
                    style={{ width: '100%', height: "100%", borderRadius: 7 }}
                />
            </View>
            <View style={styles.contentCon}>
                {/* futsal name */}
                <Text style={styles.headingTxt}>
                    {data?.name}
                </Text>
                {/* campacity and price per hour container */}
                <View style={[styles.rowCon]}>
                    <Text style={styles.priceText}>
                        ${data?.basePrice} per hour
                    </Text>
                    <View style={styles.campacityCon}>
                        <Text style={styles.campacityText}>
                            {data?.activePlayersPerTeam} vs {data?.activePlayersPerTeam}
                        </Text>
                    </View>
                </View>
                <CustomButton
                    title="Book Now"
                    titleStyle={styles.btnTxt}
                    onClickHandler={() => {
                        if (isLoggedIn) {
                            dispatch(addBookingCourtId(data?.id))
                            navigate('FutsalsStack',
                                {
                                    screen: "BookingDetails",
                                    initial: false,
                                    params: { id: data?.id, courtName: data?.name, venueId, venueCity, venueAddress, distance }
                                })
                        } else {
                            setAuthenticateModal(true)
                        }

                    }}
                />
            </View>
            <AuthenticateModal authenticateModal={authenticateModal} venueId={venueId} setAuthenticateModal={setAuthenticateModal} />
        </View>
    )
}
//
export default CourtsCard;
//
const styles = StyleSheet.create({
    container: {
        columnGap: 10,
        padding: '3%',
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color,
        flexDirection: 'row',
    },
    imageCon: {
        width: 120,
        height: 100,
        borderRadius: 7,
        backgroundColor: COLORS.light_green_color
    },
    contentCon: {
        flex: 1,
        rowGap: 10,
        minHeight: 90,
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
        fontSize: 15,
        fontWeight: '700',
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
    btnTxt: {
        fontSize: 12,
        fontWeight: "bold"
    },
    priceText: {
        fontSize: 13,
        fontWeight: '700',
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