//
import React, { useState } from 'react';
import { Formik } from 'formik';
import { COLORS, LAY_OUT, SIZES2, appLayout } from '../../../../theme/globalStyle';
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { post } from '../../../../api/post';
import { requestForgetPasswordValidationSchema } from '../../../../validation/requestForgetPassword'
import { Snackbar } from 'react-native-paper';
//
const ResetPassword = ({ navigation }) => {
    const resetInfo = { phoneNumber: '' }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    //
    const onSendMeOTP = async (values) => {
        try {
            setLoading(true)
            const { result } = await post("authenticate/userRequestForgetPasswordOTP", setError, setLoading, JSON.stringify(values))
            console.log('====================================');
            console.log("re-->", result);
            console.log('====================================');
            if (result?.message == "OTP is sent successfully please verify") {
                navigation.navigate('OTPstack', {
                    screen: 'verifyForgetPasswordOTP',
                    params: {
                        phoneNumber: values.phoneNumber
                    }
                })
            }
            if (result?.status == "BAD_REQUEST") {
                setError(result)
                setVisible(true)
            }
            if (result?.message == "User does not exist") {
                setError(result)
                setVisible(true)
            }
        } catch (error) {
            console.log(error);
        }
        // console.log('values', values);
    }
    //
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView style={styles.scrollCon} contentContainerStyle={{ padding: LAY_OUT.padding }}>
                    <AuthHeader />
                    <Devider height={25} />
                    <Formik
                        onSubmit={onSendMeOTP}
                        initialValues={resetInfo}
                        validationSchema={requestForgetPasswordValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={[[SIZES2.text_lg]]}>
                                        RESET PASSWORD
                                    </Text>
                                    <Devider />
                                    <CustomInput
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                        error={errors?.phoneNumber ? true : false}
                                    />
                                    <CustomBtn loading={loading} onClickHandler={handleSubmit} title="Send OTP" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <Text onPress={() => navigation.pop()} style={styles.backHomeTxt}>
                        Back to Home
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Verification Failed',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {error?.message}
            </Snackbar>
        </SafeAreaView>
    )
}
//
export default ResetPassword;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
    },
    formCon: {
        minHeight: 200,
        padding: LAY_OUT.padding,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color,
        rowGap: 13
    },
    backHomeTxt: {
        ...SIZES2.text_sm,
        textAlign: "center",
        color: COLORS.primary_color
    },
    Title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
})
//