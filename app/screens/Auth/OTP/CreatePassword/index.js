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
import { changePasswordValidationSchema } from '../../../../validation/changePassword'
import { post } from '../../../../api/post';
//
const CreatePassword = () => {
    const { navigate } = useNavigation();
    const [resError, setResError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [eyeToggle, setEyeToggle] = useState(false);
    const passwordValue = { newPassword: '', confirmPassword: '', phoneNumber: "" }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    //
    const onSavePassword = async (values) => {
        setLoading(true)
        delete values?.confirmPassword

        const { result } = await post("authenticate/changeForgottedPassword", setError, setLoading, JSON.stringify(values))
        console.log('====================================');
        console.log("re-->", result);
        console.log('====================================');
        if (result?.message == "Password update successfully") {
            navigate('LoginStack', {
                screen: 'Login'
            })
        }
        if (result?.message == "User not found") {
            setError(result)
            setVisible(true)
        }
    }
    //
    return (
        <View style={styles.container}>
            <SafeAreaView />
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
                        onSubmit={onSavePassword}
                        initialValues={passwordValue}
                        validationSchema={changePasswordValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={[SIZES2.text_lg]}>
                                        Set Password
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
                                        label="New Password"
                                        placeholder="New Password"
                                        value={values.newPassword}
                                        onChangeText={handleChange("newPassword")}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                        error={errors?.newPassword ? true : false}
                                    />
                                    <CustomInput
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        value={values.confirmPassword}
                                        onChangeText={handleChange("confirmPassword")}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                        error={errors?.confirmPassword ? true : false}
                                    />
                                    {
                                        resError &&
                                        <View style={styles.errorCon}>
                                            <Octicons name="stop" size={20} color="red" />
                                            <Text style={styles.errorText}>
                                                {errorMessage}
                                            </Text>
                                        </View>
                                    }
                                    <CustomBtn loading={loading} onClickHandler={handleSubmit} title="Save" />
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
        </View>
    )
}
//
export default CreatePassword;
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
        padding: LAY_OUT.padding,
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

