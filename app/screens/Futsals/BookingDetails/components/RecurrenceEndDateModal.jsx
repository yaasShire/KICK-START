import { View, Text, Modal, StyleSheet, Pressable, Image, Button, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import ewalletImage from '../../../../../assets/images/ewallet.png'
import { Checkbox } from 'react-native-ui-lib'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import CustomButton from '../../../../components/CustomBtn'
import { TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { paymentValidationSchema } from '../../../../validation/paymentValidation'
import RecurrenceEndDatePicker from './RecurrenceEndDatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { addBookingRecurrenceEndDate } from '../../../../redux/homeSlice'
import { MaterialIcons } from '@expo/vector-icons'

// 
const RecurrenceEndDateModal = ({ showRecurrenceEndDateModal = false, setShowRecurrenceEndDateModal = () => { }, setShowPaymentModal = () => { }, calculateBookingPrice = () => { } }) => {
    // 
    const matchDateStart = useSelector(state => state?.homeSlice?.bookingData?.matchDateStart)

    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date(matchDateStart));

    const selectedFormattedDate = selectedDate?.getFullYear().toString() + "-" + (selectedDate?.getMonth() + 1).toString().padStart(2, '0') + "-" + selectedDate?.getDate().toString().padStart(2, '0')


    const onCloseModal = () => {
        setShowRecurrenceEndDateModal(!showRecurrenceEndDateModal)
    }
    const onContinue = () => {
        setShowRecurrenceEndDateModal(!showRecurrenceEndDateModal)
        setShowPaymentVerificationModal(true)
        setPayButtonDisabled(false)
    }

    const addRecurrenceEndDate = () => {
        dispatch(addBookingRecurrenceEndDate(selectedFormattedDate))
        setShowRecurrenceEndDateModal(false)
        setShowPaymentModal(true)
    }

    // 
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showRecurrenceEndDateModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setShowRecurrenceEndDateModal(!showRecurrenceEndDateModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.imagePaymentNameWrapper}>
                        {/* <Image source={ewalletImage} style={styles.paymentMethodImage} /> */}
                        <MaterialIcons name='date-range' size={30} color={COLORS.primary_color} />
                        <Text style={[SIZES2.text_base]}>Choose Recurrence End Date</Text>
                    </View>
                    <>
                        <RecurrenceEndDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <CustomButton title='Cancel'
                                customStyle={{ width: 100, backgroundColor: COLORS.bg_secondary }}
                                textStyle={{ color: "#000", ...SIZES2.text_md }}
                                onClickHandler={onCloseModal}
                            />
                            {/* <Button title='Cancel' onPress={onCloseModal} />
                        <Button title='Continue' onPress={onContinue} /> */}
                            <CustomButton title='Next'
                                customStyle={{ width: 100, backgroundColor: COLORS.primary_color }}
                                textStyle={{ ...SIZES2.text_md, color: "#fff" }}
                                onClickHandler={addRecurrenceEndDate}
                            />
                        </View>
                    </>
                </View>
            </View>
        </Modal>
    )
}

export default RecurrenceEndDateModal


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
        width: "90%",
        height: Platform.OS == "ios" ? "30%" : "35%",
        rowGap: 18,
        marginBottom: 50
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
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    imagePaymentNameWrapper: {
        alignItems: "center",
        rowGap: 8
    },
    saveNumberWrapper: {
        ...LAY_OUT.flex_row,
        columnGap: 5
    }

});