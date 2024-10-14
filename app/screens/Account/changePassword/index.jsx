//
import React, { useState } from 'react';
import * as ImagePickers from 'expo-image-picker';
import { nearByFutsalsData } from '../../../data';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { BookedFutsalCards, CustomBtn, CustomInput, Devider, FutsalCards, ImageViewer, ListHeader, SubHeader } from '../../../components';
import { Dimensions, FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Snackbar, TextInput } from 'react-native-paper';
//
// import TextField from 'react-native-ui-lib/textField';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { post } from '../../../api/post';
import { authorizedUpdate } from '../../../api/authorizedUpdate'
import { authorizedchangePasswordValidationSchema } from '../../../validation/authorizedChangePassword'
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea';
//
const { height } = Dimensions.get('window');
///
const ChangePassword = ({ route }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState(route?.params?.user)
    const intialValues = { oldPassword: "", newPassword: "", confirmPassword: "" }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { goBack } = useNavigation()
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    const pickImageAsync = async () => {
        let result = await ImagePickers.launchImageLibraryAsync({
            mediaTypes: ImagePickers.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            console.log('------', result.assets[0].uri);
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };
    const pickImage = () => {
        pickImageAsync()
    }
    //
    const onChangeText = () => {

    }
    const onSaveChanges = async (values) => {
        try {
            setLoading(true)
            delete values?.confirmPassword
            const result = await authorizedUpdate("authenticate/changePassword", setError, setLoading, JSON.stringify(values))
            console.log('====================================');
            console.log(result);
            console.log('====================================');
            if (result?.result?.message == "User Password Updated Successfully") {
                goBack()
            }
            if (result?.result?.message == "Old Password Is Not Correct") {
                setError(result?.result)
                setVisible(true)
            }
        } catch (error) {
            console.log(error);
        }
        console.log(values);
    }
    //
    return (
        <View style={styles.mainContainer}>
            <IosAndroidSafeArea />
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {/* Head */}
                    <View style={styles.head}>
                        <SubHeader title="Change Password" showNotification={false} />
                    </View>
                    {/* Body */}
                    <View style={styles.body}>
                        <Devider height={35} />
                        {/* form container */}
                        <Formik
                            onSubmit={onSaveChanges}
                            initialValues={intialValues}
                            validationSchema={authorizedchangePasswordValidationSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={styles.formCon}>
                                        <ListHeader title="Change Password" />
                                        <Devider />
                                        <TextInput
                                            label="Old Password"
                                            keyboardType="default"
                                            placeholder="xxxxxxxxx"
                                            value={values.oldPassword}
                                            onChangeText={handleChange("oldPassword")}
                                            error={errors?.oldPassword ? true : false}
                                            mode='outlined'
                                        />
                                        <Devider />
                                        <TextInput
                                            label="New Password"
                                            keyboardType="email-address"
                                            placeholder="xxx@gmail.com"
                                            value={values.newPassword}
                                            onChangeText={handleChange("newPassword")}
                                            error={errors?.newPassword ? true : false}
                                            mode='outlined'
                                        />
                                        <Devider />
                                        <TextInput
                                            label="Confirm Password"
                                            keyboardType="email-address"
                                            placeholder="xxx@gmail.com"
                                            value={values.confirmPassword}
                                            onChangeText={handleChange("confirmPassword")}
                                            error={errors?.confirmPassword ? true : false}
                                            mode='outlined'
                                        />
                                        {/* <Devider /> */}
                                        {/* <TextField
                                    text65R
                                    floatOnFocus
                                    floatingPlaceholder
                                    onChangeText={onChangeText}
                                    placeholder={'Phone Number'}
                                    fieldStyle={styles.fieldsStyle}
                                    containerStyle={styles.inputCon}
                                    defaultValue="252 61 5 094 596"
                                /> */}
                                        <Devider height={30} />
                                        <CustomBtn loading={loading} title="Save Changes" onClickHandler={handleSubmit} />
                                    </View>
                                )
                            }}
                        </Formik>
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
        </View>
    )
}
//
export default ChangePassword;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: appLayout.padding,
        backgroundColor: COLORS.bg_primary
    },
    body: {
        flex: 1,
        zIndex: 1000,
        padding: '3%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary
    },
    profileCon: {
        rowGap: 20,
        alignItems: 'center'
    },
    imageCon: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
        backgroundColor: COLORS.bg_primary,
    },
    formCon: {
        paddingHorizontal: '3%'
    },

    inputCon: {
        borderBottomWidth: 1,
        paddingBottom: '3%'
    },
})
//