//
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { COLORS, appLayout } from '../../../theme/globalStyle';
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const SignUpScreen = () => {
    const { navigate } = useNavigation();
    const [eyeToggle, setEyeToggle] = useState(false);
    const signUpInfo = { fullName: '', phoneNumber: '' }
    //
    const onSignUp = (values) => {
        // console.log("Values", values);
        navigate('OTPstack', {
            screen: 'OTP',
            params: {
                phoneNumber: values.phoneNumber
            }
        })
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
                        onSubmit={onSignUp}
                        initialValues={signUpInfo}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.Title}>
                                        SIGN-UP
                                    </Text>
                                    <Devider />
                                    <CustomInput
                                        label="Full Name"
                                        placeholder="Full Name"
                                        value={values.fullName}
                                        onChangeText={handleChange("fullName")}
                                    />
                                    <CustomInput
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                    />
                                    <CustomBtn onClickHandler={handleSubmit} title="SIGN-UP" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />

                    <Text style={styles.termsTxt}>
                        By clicking the Sign Up button, I agree to the terms
                        and conditions of SPORT ON
                    </Text>
                    <Devider height={20} />
                    <View style={styles.signUpCon}>
                        <Text style={styles.signUpTxt1}>
                            Already have an account?
                        </Text>
                        <Text onPress={() => navigate('LoginStack')} style={styles.signUpTxt2}>
                            Login Now
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default SignUpScreen;
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
    Title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    signUpCon: {
        columnGap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpTxt1: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.3,
        color: COLORS.black800
    },
    signUpTxt2: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
        color: COLORS.primary_color
    },
    termsTxt: {
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.3,
        textAlign: 'center',
        color: COLORS.black800
    },
})
//