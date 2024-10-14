//
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SIZES2, appLayout } from '../../../../theme/globalStyle';
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../../components';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import authorizedPostAuthentication from '../../../../api/authorizedPost';
import { Button, Snackbar } from 'react-native-paper';
import { post } from '../../../../api/post';
//
const VerifyForgetPassworOTP = ({ navigation, route }) => {
    // const { phoneNumber } = route.params;
    const [resError, setResError] = useState(false);
    const OTP_Values = { box0: "", box1: '', box2: '', box3: '', box4: '', box5: "" }
    const [resendLoading, setResendLoading] = useState(false)
    const [remainingTime, setRemainingTime] = useState(180); // Set initial time to 2 minutes (120 seconds)
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);
    const [showResendButton, setShowResendButton] = useState(false)
    const otpInputs = useRef([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    //

    const handleFocus = () => {
        otpInputs?.current[0]?.focus();
    };
    const handleInputChange = async (index, value) => {
        // Update the input value in the state
        const newOtpInputs = [...otpInputs.current];
        newOtpInputs[index].value = value;

        // If the input is cleared, move focus to the previous input

        if (!value && index > 0) {
            newOtpInputs[index - 1].focus();
        } else if (index < otpInputs.current.length - 1) {
            // If not the last digit and not clearing, move focus to the next input
            newOtpInputs[index + 1].focus();
        }
        if (index === otpInputs.current.length - 1 && value) {
            const otpValue = newOtpInputs.map((input) => input.value).join('');
            console.log('OTP Value:', otpValue);
            onConfirmOTP()
            // You can now use otpValue as needed, for example, for OTP verification or form submission
        }

        // Update the refs with the modified inputs
        otpInputs.current = newOtpInputs;
    };
    const getOtpValue = () => {
        return otpInputs.current.map((input) => input.value).join('');
    };

    useEffect(() => {
        handleFocus()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(interval);
                    // Handle OTP verification timeout
                    setShowResendButton(true)
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, seconds]);

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const resendOTP = async () => {
        setLoading(true)
        const { result } = await post("authenticate/userRequestForgetPasswordOTP", setError, setLoading, JSON.stringify(route?.params))
        console.log('====================================');
        console.log("resend code result-->", result);
        console.log('====================================');
        if (result?.message == "OTP is sent successfully please verify") {
            setMinutes(3)
            setSeconds(0)
            setRemainingTime(180)
            setShowResendButton(false)
        }
    }

    const onConfirmOTP = async (values) => {
        setLoading(true)
        const otpValue = getOtpValue();
        const otpAuthenticate = {
            otp: otpValue
        }
        const { result } = await post("authenticate/verifyForgetPasswordOTP", setError, setLoading, JSON.stringify(otpAuthenticate))
        console.log(result);
        if (result?.status === "BAD_REQUEST") {
            setError(result)
            setVisible(true)
        }
        if (result?.message == "OTP verified successfully") {
            navigation.navigate('CreatePassword')
        }
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
                <ScrollView style={styles.scrollCon}>
                    <AuthHeader />
                    <Devider height={25} />
                    <Formik
                        onSubmit={onConfirmOTP}
                        initialValues={OTP_Values}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.OTPtitle}>
                                        ENTER OTP
                                    </Text>
                                    <Devider height={10} />
                                    <Text style={styles.OTPdesc}>
                                        {/* Enter the One-Time Pin sent to this ({phoneNumber}) phone number */}
                                    </Text>
                                    <Devider />
                                    <View style={styles.OTP_Container}>
                                        <TextInput
                                            ref={(input) => (otpInputs.current[0] = input)}
                                            maxLength={1}
                                            error={resError}
                                            value={values.box0}
                                            keyboardType="number-pad"
                                            style={styles.OTP_Input}
                                            // onChangeText={handleChange("box1")}
                                            onChangeText={(value) => {
                                                handleChange('box0')(value)
                                                handleInputChange(0, value)
                                            }}
                                        />
                                        <TextInput
                                            ref={(input) => (otpInputs.current[1] = input)}
                                            maxLength={1}
                                            error={resError}
                                            value={values.box1}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            // onChangeText={handleChange("box2")}
                                            onChangeText={(value) => {
                                                handleChange('box1')(value)
                                                handleInputChange(1, value)
                                            }}
                                        />
                                        <TextInput
                                            ref={(input) => (otpInputs.current[2] = input)}
                                            maxLength={1}
                                            error={resError}
                                            value={values.box2}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            // onChangeText={handleChange("box3")}
                                            onChangeText={(value) => {
                                                handleChange('box2')(value)
                                                handleInputChange(2, value)
                                            }}
                                        />
                                        <TextInput
                                            ref={(input) => (otpInputs.current[3] = input)}
                                            maxLength={1}
                                            error={resError}
                                            value={values.box3}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            // onChangeText={handleChange("box4")}
                                            onChangeText={(value) => {
                                                handleChange('box3')(value)
                                                handleInputChange(3, value)
                                            }}
                                        />
                                        <TextInput
                                            ref={(input) => (otpInputs.current[4] = input)}
                                            maxLength={1}
                                            error={resError}
                                            value={values.box4}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            // onChangeText={handleChange("box4")}
                                            onChangeText={(value) => {
                                                handleChange('box4')(value)
                                                handleInputChange(4, value)
                                            }}
                                        />
                                        <TextInput
                                            ref={(input) => (otpInputs.current[5] = input)}
                                            maxLength={1}
                                            error={resError}
                                            value={values.box5}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            // onChangeText={handleChange("box4")}
                                            onChangeText={(value) => {
                                                handleChange('box5')(value)
                                                handleInputChange(5, value)
                                            }}
                                        />
                                    </View>
                                    <View style={{ rowGap: 13 }}>
                                        <CustomBtn loading={loading} onClickHandler={handleSubmit} title="Next" />
                                        <View style={{ flexDirection: "row", columnGap: 6, justifyContent: "center", alignItems: "center" }}>
                                            {
                                                (minutes > 0 || seconds > 0) &&
                                                <>
                                                    <Text style={[SIZES2.text_sm]}>Remaining :</Text>
                                                    <Text style={[SIZES2.text_sm]}>{formattedTime}</Text>
                                                </>
                                            }
                                            {
                                                showResendButton &&
                                                <Pressable onPress={resendOTP}>
                                                    {
                                                        loading ?
                                                            <ActivityIndicator size={40} />
                                                            :
                                                            <Text style={{ ...SIZES2.text_sm, textAlign: "center", color: "red" }}>Resend OTP?</Text>
                                                    }
                                                </Pressable>
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <Text onPress={() => navigation.pop()} style={styles.backHomeTxt}>
                        Back to Login
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
export default VerifyForgetPassworOTP;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
        padding: '4%',
    },
    formCon: {
        minHeight: 200,
        padding: '4%',
        paddingBottom: '6%',
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color
    },
    backHomeTxt: {
        ...SIZES2.text_sm,
        textAlign: "center",
        color: COLORS.primary_color
    },
    OTPtitle: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    OTPdesc: {
        fontSize: 17,
        fontWeight: '400',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    OTP_Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    OTP_Input: {
        width: '12%',
        height: 40,
        borderRadius: 4,
        marginBottom: '5%',
        textAlign: 'center',
        backgroundColor: COLORS.bg_primary,
        borderWidth: 1,
        borderColor: COLORS.primary_color
    }
})
//