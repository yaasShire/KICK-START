//
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Snackbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import google from '../../../../../assets/images/google.png';
import faceBook from '../../../../../assets/images/faceBook.png';
import { COLORS, LAY_OUT, SIZES2, appLayout } from '../../../../theme/globalStyle';
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { loginValidationSchema } from '../../../../validation/login'
import { post } from '../../../../api/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
const LoginScreen = ({ route }) => {
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
        setLoading(true)
        const { result } = await post("authenticate/singInAsCustomer", setError, setLoading, JSON.stringify(values))
        console.log("result-->", result);
        if (result?.message == "User successfully loged in") {
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
            await AsyncStorage.setItem('accessToken', result?.access_token);
            if (route?.params?.venueDetail == true) {
                navigate('BottomTabNavigations', {
                    screen: 'FutsalsStack',
                    params: { screen: "Details", params: { id: route?.params?.venueId } }
                })
            }
            navigate('BottomTabNavigations', {
                screen: 'Home'
            })
        }
        if (result?.message == "Invalid credentials") {
            setVisible(true)
            setError(result)
        }
        if (result?.status == "BAD_REQUEST") {
            setVisible(true)
            setError(result)
        }
        if (result?.message == "Invalid User") {
            setVisible(true)
            setError(result)
        }

    }
    console.log(route);
    //
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollCon} contentContainerStyle={{ padding: LAY_OUT.padding }}>
                    <AuthHeader showBackButton={true} />
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
                                        LOGIN AS CUSTOMER
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
                                    <Text onPress={() => navigate('ResetPassword')} style={[SIZES2.text_sm]}>
                                        Forgot Password?
                                    </Text>
                                    <CustomBtn loading={loading} onClickHandler={handleSubmit} title="LOGIN" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <View style={styles.signUpCon}>
                        <Text style={[SIZES2.text_sm]}>
                            New to Sport-On?
                        </Text>
                        <Text onPress={() => navigate('SignUpScreen')} style={styles.signUpTxt2}>
                            Sign Up Now
                        </Text>
                    </View>
                    <Devider height={20} />
                    <View style={styles.signUpCon}>
                        <Text onPress={() => navigate('ResetPassword')} style={styles.signUpTxt2}>
                            Forget Password?
                        </Text>
                    </View>
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
export default LoginScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
        // padding: '4%',
    },
    formCon: {
        minHeight: 200,
        padding: '4%',
        paddingBottom: '6%',
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color,
        rowGap: 13
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
        ...SIZES2.text_sm,
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

