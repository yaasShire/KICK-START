//
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Snackbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import { COLORS, LAY_OUT, SIZES2, appLayout } from '../../../theme/globalStyle'
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { loginValidationSchema } from '../../../validation/login'
import { post } from '../../../api/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
const ProviderLogin = () => {
    const [resError, setResError] = useState(false);
    const [eyeToggle, setEyeToggle] = useState(false);
    const loginInfo = { phoneNumber: '', password: '' }
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    //
    //
    const onLogin = async (values) => {
        try {
            setLoading(true)
            const { result } = await post("authenticate/singInAsProvider", setError, setLoading, JSON.stringify(values))
            console.log("result-->", result);
            if (result?.message == "User successfully loged in") {
                await AsyncStorage.setItem('isProviderLoggedIn', JSON.stringify(true));
                await AsyncStorage.setItem('providerAccessToken', result?.access_token);
                navigate("MainProvider")
            }
            if (result?.message == "Invalid credentials") {
                setVisible(true)
                setError(result)
            }
            if (result?.message == "Invalid User") {
                setVisible(true)
                setError(result)
            }
        } catch (error) {
            console.log(error);
        }
        console.log(values);
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
                    <AuthHeader showBackButton={false} />
                    <Devider height={25} />
                    <Formik
                        onSubmit={onLogin}
                        initialValues={loginInfo}
                        validationSchema={loginValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={[SIZES2.text_lg]}>
                                        LOGIN As a Provider
                                    </Text>
                                    <CustomInput
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                        error={errors?.phoneNumber ? true : false}
                                    />
                                    <CustomInput
                                        label="Password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                        error={errors?.password ? true : false}
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
                                    {/* <Text onPress={() => navigate('ResetPassword')} style={styles.forgotPasswordTxt}>
                                        Forgot Password?
                                    </Text> */}
                                    <CustomBtn loading={loading} onClickHandler={handleSubmit} title="LOGIN" />
                                </View>
                            )
                        }}
                    </Formik>
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
export default ProviderLogin;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
        padding: LAY_OUT.padding,
    },
    formCon: {
        minHeight: 200,
        padding: '4%',
        paddingBottom: '6%',
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color,
        rowGap: 15
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
        ...SIZES2.text_sm,
        color: COLORS.primary_color
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

