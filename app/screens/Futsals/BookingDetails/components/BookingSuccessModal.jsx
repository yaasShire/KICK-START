import { View, Text, Modal, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import logoImage from '../../../../../assets/icon.png'
import { Checkbox } from 'react-native-ui-lib'
import { useDispatch } from 'react-redux'
import CustomButton from '../../../../components/CustomBtn'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import { useNavigation } from '@react-navigation/native'

const BookingSuccessModal = ({ bookingSuccesfulMessage = "", showbookingSuccessModal = false, setShowBookingSuccessModal = () => { }, setPayButtonDisabled = () => { } }) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const onCloseModal = () => {
        setShowBookingSuccessModal(!showbookingSuccessModal)
        navigate("HomeStack", { screen: "Home" })
    }
    const onContinue = () => {
        setShowBookingSuccessModal(!showbookingSuccessModal)
        navigate("BookedFutsalsStack", { screen: "Booked Futsals" })
        // setPayButtonDisabled(false)
        // dispatch(setCurrentBookStep(-1))
        // dispatch(setStepperCurrentIndex(2))
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showbookingSuccessModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setShowBookingSuccessModal(!showbookingSuccessModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.imageTextsWrapper}>
                        <Image source={logoImage} style={styles.planeImage} />
                        <Text style={[SIZES2.text_base, { fontFamily: "poppins600" }]}>{bookingSuccesfulMessage || "Booking Successfully Completed"}</Text>
                        <Text style={[SIZES2.text_md]}>Thank you for choosing our service</Text>
                    </View>
                    <View style={{ justifyContent: "space-around", alignItems: "center", flex: 1 }}>
                        <CustomButton title='View Booked Venues'
                            customStyle={{ width: "100%", backgroundColor: COLORS.primary_color }}
                            textStyle={{ ...SIZES2.text_md, color: "#fff" }}
                            onClickHandler={onContinue}
                        />
                        <CustomButton title='Got To Home'
                            customStyle={{ width: "100%", backgroundColor: COLORS.bg_tertiary }}
                            textStyle={{ color: COLORS.font_secondary, ...SIZES2.text_md }}
                            onClickHandler={onCloseModal}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default BookingSuccessModal


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
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
        height: "35%",
        rowGap: 12,
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
    planeImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        resizeMode: "contain"
    },
    imagePaymentNameWrapper: {
        ...LAY_OUT.flex_row,
        columnGap: 5
    },
    saveNumberWrapper: {
        ...LAY_OUT.flex_row,
        columnGap: 5
    },
    imageTextsWrapper: {
        ...LAY_OUT.flex_col,
        rowGap: 7
    }

});