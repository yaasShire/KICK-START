import { View, Text, Modal, StyleSheet, Pressable, Image, Button, Platform } from 'react-native'
import React from 'react'
import ewalletImage from '../../../../../../assets/images/ewallet.png'
import { Checkbox } from 'react-native-ui-lib'
import { TextInput } from 'react-native-paper'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import CustomButton from '../../../../../components/CustomBtn'
import { Formik } from 'formik'
import { paymentValidationSchema } from '../../../../../validation/paymentValidation'
const PayModal = ({ showPaymentModal = false, setShowPaymentModal = () => { }, setPayButtonDisabled = () => { }, setShowPaymentVerificationModal = () => { }, subscribe = () => { } }) => {
    const onCloseModal = () => {
        setShowPaymentModal(!showPaymentModal)
    }
    // const onContinue = () => {
    //     setShowPaymentModal(!showPaymentModal)
    //     setShowPaymentVerificationModal(true)
    //     setPayButtonDisabled(false)
    // }
    const onPay = (values = {}) => {
        try {
            console.log(values);
            subscribe()
        } catch (error) {
            console.log(error);
        }
    }
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
                        onSubmit={onPay}
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
                                            value={values.phoneNumber}
                                            error={errors?.phoneNumber && touched?.phoneNumber ? true : false}
                                            onChangeText={(text) => handleChange('phoneNumber')(text)}
                                        />
                                    </View>
                                    {/* <View style={styles.saveNumberWrapper}>
                        <Checkbox />
                        <Text style={[SIZES2.text_md]}>Save Phone Number</Text>
                    </View> */}
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <CustomButton title='Cancel'
                                            customStyle={{ width: 100, backgroundColor: COLORS.bg_secondary }}
                                            textStyle={{ color: "#000", ...SIZES2.text_md }}
                                            onClickHandler={onCloseModal}
                                        />
                                        <CustomButton title='Pay'
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

export default PayModal


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