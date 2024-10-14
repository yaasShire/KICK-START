import { View, Text, Modal, StyleSheet, Pressable, Image, Button, Platform, Linking } from 'react-native'
import React from 'react'
import ewalletImage from '../../../../../assets/images/ewallet.png'
import { Checkbox } from 'react-native-ui-lib'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import CustomButton from '../../../../components/CustomBtn'
import { TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { paymentValidationSchema } from '../../../../validation/paymentValidation'
import { useSelector } from 'react-redux'

const PaymentModal = ({ showPaymentModal = false, setShowPaymentModal = () => { }, setPayButtonDisabled = () => { }, setShowPaymentVerificationModal = () => { }, calculateBookingPrice = () => { } }) => {
    const calculatedBookingPrice = useSelector(state => state?.homeSlice?.bookingData?.calculatedBookingPrice)
    const bookingType = useSelector(state => state?.homeSlice?.bookingData?.bookingType)
    const bookingTotalPrice = useSelector(state => state?.homeSlice?.bookingData?.totalPrice)

    const onCloseModal = () => {
        setShowPaymentModal(!showPaymentModal)
    }
    const onContinue = async (values = {}) => {
        let price = await calculateBookingPrice();
        price = parseFloat(price).toFixed(2); // Ensure the price is in two decimal places, e.g., '25.20'

        // Convert the price to cents (e.g., '25.20' becomes '2520')
        let priceInCents = (parseFloat(price) * 100).toFixed(0);

        setShowPaymentModal(!showPaymentModal);
        setShowPaymentVerificationModal(true);
        setPayButtonDisabled(false);

        // Dial using the integer value in cents (e.g., 2520 cents = $25.20)
        // Linking.openURL(`tel:*712*612518368*${priceInCents}#`);

    }

    // const onPay = (values = {}) => {
    //     try {
    //         console.log(values);
    //         subscribe()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showPaymentModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setShowPaymentModal(!showPaymentModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.imagePaymentNameWrapper}>
                        <Image source={ewalletImage} style={styles.paymentMethodImage} />
                        <Text style={[SIZES2.text_lg]}>Mobile Wallet</Text>
                    </View>
                    <Formik
                        initialValues={{ phoneNumber: "" }}
                        onSubmit={onContinue}
                        validationSchema={paymentValidationSchema}
                    >
                        {
                            ({ errors, values, handleSubmit, touched, handleChange }) => (
                                <>
                                    <View>
                                        <TextInput
                                            label="Phone Number"
                                            mode='flat'
                                            style={{ backgroundColor: "#fff", ...SIZES2.text_sm }}
                                            keyboardType='number-pad'
                                            error={errors?.phoneNumber && touched?.phoneNumber ? true : false}
                                            value={values.phoneNumber}
                                            onChangeText={(text) => handleChange('phoneNumber')(text)}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <CustomButton title='Cancel'
                                            customStyle={{ width: 100, backgroundColor: COLORS.bg_secondary }}
                                            textStyle={{ color: "#000", ...SIZES2.text_md }}
                                            onClickHandler={onCloseModal}
                                        />
                                        {/* <Button title='Cancel' onPress={onCloseModal} />
                        <Button title='Continue' onPress={onContinue} /> */}
                                        <CustomButton title='Continue'
                                            customStyle={{ width: 100, backgroundColor: COLORS.primary_color }}
                                            textStyle={{ ...SIZES2.text_md, color: "#fff" }}
                                            onClickHandler={handleSubmit}
                                        />
                                    </View>
                                </>
                            )
                        }
                    </Formik>
                </View>
            </View>
        </Modal>
    )
}

export default PaymentModal


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
        height: Platform.OS == "ios" ? "30%" : "50%",
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
        alignItems: "center"
    },
    saveNumberWrapper: {
        ...LAY_OUT.flex_row,
        columnGap: 5
    }

});