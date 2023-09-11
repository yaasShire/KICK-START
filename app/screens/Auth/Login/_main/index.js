//
import React, { useState } from 'react';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import google from '../../../../../assets/images/google.png';
import faceBook from '../../../../../assets/images/faceBook.png';
import { COLORS, appLayout } from '../../../../theme/globalStyle';
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const LoginScreen = () => {
    const [resError, setResError] = useState(false);
    const [eyeToggle, setEyeToggle] = useState(false);
    const loginInfo = { phoneNumber: '', password: '' }
    const { navigate } = useNavigation();
    //
    const onLogin = (values) => {
        // console.log("Values", values);
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
                        onSubmit={onLogin}
                        initialValues={loginInfo}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.loginTitle}>
                                        LOGIN
                                    </Text>
                                    <Devider />
                                    <CustomInput
                                        error={resError}
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                    />
                                    <CustomInput
                                        error={resError}
                                        label="Password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                    />
                                    {
                                        resError &&
                                        <View style={styles.errorCon}>
                                            <Octicons name="stop" size={20} color="red" />
                                            <Text style={styles.errorText}>
                                                Login Credential
                                            </Text>
                                        </View>
                                    }
                                    <Text onPress={() => navigate('ResetPassword')} style={styles.forgotPasswordTxt}>
                                        Forgot Password?
                                    </Text>
                                    <CustomBtn onClickHandler={handleSubmit} title="LOGIN" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <View style={styles.signUpCon}>
                        <Text style={styles.signUpTxt1}>
                            New to Sport-On?
                        </Text>
                        <Text onPress={() => navigate('SignUpScreen')} style={styles.signUpTxt2}>
                            Sign Up Now
                        </Text>
                    </View>
                    <Devider height={40} />
                    <Text style={styles.text}>
                        Or Login Using
                    </Text>
                    <Devider height={30} />
                    <View style={styles.mediaCon}>
                        <Image
                            source={google}
                            resizeMode="contain"
                            style={{ width: 70, height: 70 }}
                        />
                        <Image
                            source={faceBook}
                            resizeMode="contain"
                            style={{ width: 70, height: 70, borderRadius: 70 }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default LoginScreen;
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
    loginTitle: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    errorCon: {
        columnGap: 5,
        marginLeft: '1%',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        marginLeft: '1%',
        color: "red"
    },
    forgotPasswordTxt: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        marginLeft: '1%',
        marginBottom: '7%',
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
    text: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: COLORS.black800
    },
    mediaCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 30
    },
})
//

