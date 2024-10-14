//
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Divider, Snackbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT, SIZES2, appLayout } from '../../../theme/globalStyle';
import { AuthHeader, CustomBtn, CustomInput, Devider } from '../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AXIOS_BASE_URL_2 } from '../../../api/base2';
import authorizedPostAuthentication from '../../../api/authorizedPost';
import { signUpValidationSchema } from '../../../validation/signup';
import { post } from '../../../api/post';
import RegionListPicker from '../picker';
import { get } from '../../../api/get';
import CityListPicker from '../../../components/CityListPicker';
import { useDispatch, useSelector } from 'react-redux';
import GenderListPicker from '../picker/genderListPicker';
import PickDate from '../../Futsals/BookingDetails/components/pickDate';
import { addDOB } from '../../../redux/auth';
//
const SignUpScreen = () => {
    const { navigate } = useNavigation();
    const [eyeToggle, setEyeToggle] = useState(false);
    const signUpInfo = { fullName: '', phoneNumber: '', email: "", password: "", confirmPassword: "" }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [regions, setRegions] = useState([])
    const [cities, setCities] = useState([])
    const selectedRegion = useSelector(state => state?.authSlice?.signUp?.region)
    const selectedCity = useSelector(state => state?.authSlice?.signUp?.city)
    const selectedGender = useSelector(state => state?.authSlice?.signUp?.gender)
    const selectedDOB = useSelector(state => state?.authSlice?.signUp?.dob)
    const [visible, setVisible] = useState(false)
    const [errorsS, setErrorsS] = useState({
        regionError: false,
        cityError: false,
        genderError: false,
        dobError: false
    })
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch = useDispatch()

    // 
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    // 
    const selectedFormattedDate = selectedDate.getFullYear().toString() + "-" + (selectedDate.getMonth() + 1).toString().padStart(2, '0') + "-" + selectedDate.getDate().toString().padStart(2, '0')

    //
    const onSignUp = async (values) => {
        setLoading(true)
        setTimeout(() => {
            setErrorsS({
                regionError: false,
                cityError: false,
                genderError: false,
                dobError: false
            })
        }, 3000)
        delete values?.confirmPassword
        const singUpData = {
            fullName: values?.fullName,
            phoneNumber: values?.phoneNumber,
            password: values?.password,
            email: values?.email,
            gender: selectedGender?.name,
            dateOfBirth: selectedDOB,
            city: selectedCity?.name,
            regionId: selectedRegion?.regionId
        }
        console.log('====================================');
        console.log(singUpData);
        console.log('====================================');
        const { result } = await post("authenticate/signUp", setError, setLoading, JSON.stringify(values))
        console.log('====================================');
        console.log("re-->", result);
        console.log('====================================');
        if (result?.message == "OTP is sent, verify") {
            navigate('OTPstack', {
                screen: 'OTP',
                params: {
                    phoneNumber: values.phoneNumber
                }
            })
        }

        if (result?.status == "BAD_REQUEST") {
            setError(result)
            setVisible(true)
        }

    }

    const getRegions = async () => {
        try {
            const { result } = await get("region/getAll")
            setRegions(result)
            getCities()
        } catch (error) {
            console.log(error)
        }
    }
    const getCities = async () => {
        try {
            const { result } = await get(`cities/${selectedRegion?.regionId}`)
            setCities(result)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getRegions()
        dispatch(addDOB(selectedFormattedDate))
        getCities()
    }, [selectedDate, selectedFormattedDate, regions])

    const genders = [
        {
            id: 1,
            name: "Male"
        },
        {
            id: 2,
            name: "Female"
        },
    ]


    //
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollCon} contentContainerStyle={{ padding: LAY_OUT.padding, }} >
                    <AuthHeader showBackButton={true} />
                    <Devider height={25} />
                    <Formik
                        onSubmit={onSignUp}
                        initialValues={signUpInfo}
                        validationSchema={signUpValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={[SIZES2.text_lg]}>
                                        SIGN-UP
                                    </Text>
                                    <Devider />
                                    <CustomInput
                                        label="Full Name"
                                        placeholder="Full Name"
                                        value={values.fullName}
                                        onChangeText={handleChange("fullName")}
                                        error={errors?.fullName ? true : false}
                                    />
                                    <CustomInput
                                        label="Phone Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                        error={errors?.phoneNumber ? true : false}
                                    />
                                    <CustomInput
                                        label="Email"
                                        placeholder="Email"
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        error={errors?.email ? true : false}
                                        keyboardType='email-address'
                                    />
                                    <CustomInput
                                        label="Password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        error={errors?.password ? true : false}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                    />
                                    <CustomInput
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        value={values.confirmPassword}
                                        onChangeText={handleChange("confirmPassword")}
                                        error={errors?.confirmPassword ? true : false}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                    />
                                    {/* <View style={{ width: "100%", rowGap: 10 }}> */}
                                    <RegionListPicker
                                        label='Choose Region'
                                        regions={regions}
                                    />
                                    <Divider style={{ backgroundColor: errorsS.regionError ? "red" : "gray", height: errorsS.cityError ? 2 : .3 }} />
                                    <CityListPicker
                                        label='Choose City'
                                        cities={cities}
                                    />
                                    <Divider style={{ backgroundColor: errorsS.cityError ? "red" : "gray", height: errorsS.cityError ? 2 : .3 }} />
                                    <GenderListPicker
                                        label='Choose Your Gender'
                                        genders={genders}
                                    />
                                    <Divider style={{ backgroundColor: errorsS.genderError ? "red" : "gray", height: errorsS.genderError ? 1 : .3 }} />
                                    <PickDate
                                        venueCity={selectedCity?.name}
                                        venueAddress={selectedRegion?.name}
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                        error={errorsS.dobError}
                                    />
                                    <Divider />
                                    {/* </View> */}

                                    <CustomBtn loading={loading} onClickHandler={() => {
                                        handleSubmit()
                                        !selectedCity?.name ? setErrorsS({ ...errorsS, cityError: true }) : null
                                        !selectedDOB ? setErrorsS({ ...errorsS, dobError: true }) : null
                                        !selectedGender?.name ? setErrorsS({ ...errorsS, genderError: true }) : null
                                        !selectedRegion?.name ? setErrorsS({ ...errorsS, regionError: true }) : null
                                        setTimeout(() => {
                                            setErrorsS({
                                                regionError: false,
                                                cityError: false,
                                                genderError: false,
                                                dobError: false
                                            })
                                        }, 3000)
                                    }} title="SIGN-UP" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <View style={styles.signUpCon}>
                        <Text style={[SIZES2.text_sm]}>
                            Already have an account?
                        </Text>
                        <Text onPress={() => navigate('LoginStack')} style={styles.signUpTxt2}>
                            Login
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
export default SignUpScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
        // padding: '4%',
        // flex: 1
    },
    formCon: {
        minHeight: 200,
        padding: LAY_OUT.padding,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color,
        rowGap: 13
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
        ...SIZES2.text_sm,
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