import { View, Text, Modal, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import logo from '../../../../../assets/icon.png'
// import CustomLoading from '../../../../../../../components/atoms/customLoading'
import { Checkbox } from 'react-native-ui-lib'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import CustomButton from '../../../../components/CustomBtn'
import { useSelector } from 'react-redux'
import { textShortner } from '../../../../utilities'

//
const PaymentVerificationModal = ({ showPaymentVerificationModal = false, setShowPaymentVerificationModal = () => { }, setShowBookingSuccessModal = () => { }, onBookVenue = () => { }, loading = false, calculatedTotalBookingPrice = 0 }) => {
    const matchDate = useSelector(state => state?.homeSlice?.bookingData?.matchDate)
    const bookingTotalPrice = useSelector(state => state?.homeSlice?.bookingData?.totalPrice)
    const bookingType = useSelector(state => state?.homeSlice?.bookingData?.bookingType)
    const bookingRecurrenceDay = useSelector(state => state?.homeSlice?.bookingData?.recurrenceDay)
    const bookingRecurrenceEndDate = useSelector(state => state?.homeSlice?.bookingData?.recurrenceEndDate)
    const calculatedBookingPrice = useSelector(state => state?.homeSlice?.bookingData?.calculatedBookingPrice)
    const selectedRecurrenceDays = useSelector(state => state?.homeSlice?.bookingData?.recurrenceDays)


    const onCloseModal = () => {
        setShowPaymentVerificationModal(!showPaymentVerificationModal)
    }
    
    const onConfirm = () => {
        onBookVenue()
    }

    console.log('====================================');
    console.log("redux values--->", matchDate, bookingTotalPrice, bookingType, bookingRecurrenceDay, bookingRecurrenceEndDate, calculatedBookingPrice);
    console.log('====================================');
    const price = bookingType == "ONE_TIME" ? bookingTotalPrice : calculatedBookingPrice
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showPaymentVerificationModal}
            onRequestClose={() => {
                setShowPaymentVerificationModal(!showPaymentVerificationModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {
                        !loading ?
                            <View style={styles.subView}>
                                <View style={styles.imagePaymentNameWrapper}>
                                    <Image source={logo} style={styles.paymentMethodImage} />
                                    <Text style={[SIZES2.text_lg]}>M0788767</Text>
                                </View>
                                <View style={[{ ...LAY_OUT.flex_row, justifyContent: "space-between" }]}>
                                    <Text style={[SIZES2.text_sm]}>Ammount:</Text>
                                    <Text style={[SIZES2.text_sm, { color: COLORS.primary_color }]}>${price}</Text>
                                </View>
                                <View style={[{ ...LAY_OUT.flex_row, justifyContent: "space-between" }]}>
                                    <Text style={[SIZES2.text_sm]}>Match Date:</Text>
                                    <Text style={[SIZES2.text_sm, { color: COLORS.primary_color }]}>{matchDate || "No Date"}</Text>
                                </View>
                                <View style={[{ ...LAY_OUT.flex_row, justifyContent: "space-between" }]}>
                                    <Text style={[SIZES2.text_sm]}>Booking Type:</Text>
                                    <Text style={[SIZES2.text_sm, { color: COLORS.primary_color }]}>{bookingType || "NO BOOKING TYPE"}</Text>
                                </View>
                                {
                                    (bookingType == "MONTHLY" || bookingType == "WEEKLY") &&
                                    <>
                                        <View style={[{ ...LAY_OUT.flex_row, justifyContent: "space-between" }]}>
                                            <Text style={[SIZES2.text_sm]}>Recurrence Day:</Text>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "65%" }}>
                                                {
                                                    selectedRecurrenceDays?.map((day, index) => (
                                                        <Text key={day} style={[SIZES2.text_sm, { color: COLORS.primary_color, }]}>{textShortner((index == selectedRecurrenceDays?.length - 1 ? day + "" : day + ", "), 10) || "NO BOOKING RECURRENCE DAY"}</Text>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View style={[{ ...LAY_OUT.flex_row, justifyContent: "space-between" }]}>
                                            <Text style={[SIZES2.text_sm]}>Recurrence End Date:</Text>
                                            <Text style={[SIZES2.text_sm, { color: COLORS.primary_color }]}>{bookingRecurrenceEndDate || "NO BOOKING RECURRENCE DATE"}</Text>
                                        </View>
                                    </>
                                }
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <CustomButton title='Cancel'
                                        customStyle={{ width: 95, height: 46, backgroundColor: COLORS.bg_tertiary }}
                                        textStyle={{ color: COLORS.font_secondary, ...SIZES2.text_sm }}
                                        onClickHandler={onCloseModal}
                                    />
                                    <CustomButton title='Confirm'
                                        customStyle={{ width: 95, height: 46, backgroundColor: COLORS.primary_color }}
                                        textStyle={{ ...SIZES2.text_sm, color: "#fff" }}
                                        onClickHandler={onConfirm}
                                    />
                                </View>
                            </View>
                            :
                            <View style={styles.loadingWrapper}>
                                <ActivityIndicator size={25} color={COLORS.primary_color} />
                                <Text style={[SIZES2.text_lg]}>Payment Processing</Text>
                            </View>
                    }
                </View>
            </View>
        </Modal >
    )
}

export default PaymentVerificationModal


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: LAY_OUT.padding,
        shadowColor: '#000',
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "93%",
        height: "38%",
        rowGap: 13,
    },
    subView: {
        rowGap: 8,
    },
    loadingWrapper: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    paymentMethodImage: {
        width: 45,
        height: 45,
        resizeMode: "contain",
        borderRadius: 10
    },
    imagePaymentNameWrapper: {
        ...LAY_OUT.flex_row,
        columnGap: 5
    },
    saveNumberWrapper: {
        ...LAY_OUT.flex_row,
        columnGap: 5
    }

});