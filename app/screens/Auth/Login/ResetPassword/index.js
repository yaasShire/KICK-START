//
import React, { useState } from 'react';
import { Formik } from 'formik';
import { COLORS, appLayout } from '../../../../theme/globalStyle';
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const ResetPassword = ({ navigation }) => {
    const resetInfo = { phoneNumber: '' }
    //
    const onSendMeOTP = (values) => {
        navigation.navigate('OTPstack', {
            screen: 'OTP',
            params: {
                phoneNumber: values.phoneNumber
            }
        })
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
                <ScrollView style={styles.scrollCon}>
                    <AuthHeader />
                    <Devider height={25} />
                    <Formik
                        onSubmit={onSendMeOTP}
                        initialValues={resetInfo}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.Title}>
                                        RESET PASSWORD
                                    </Text>
                                    <Devider />
                                    <CustomInput
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                    />
                                    <CustomBtn onClickHandler={handleSubmit} title="Send OTP" />
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
        fontSize: 18,
        textAlign: 'center',
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