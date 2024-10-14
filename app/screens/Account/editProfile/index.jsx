//
import React, { useEffect, useState } from 'react';
import * as ImagePickers from 'expo-image-picker';
import { nearByFutsalsData } from '../../../data';
import { appLayout, COLORS, LAY_OUT, SIZES2 } from '../../../theme/globalStyle';
import { BookedFutsalCards, CustomBtn, CustomInput, Devider, FutsalCards, ImageViewer, ListHeader, SubHeader } from '../../../components';
import { Dimensions, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
//
// import TextField from 'react-native-ui-lib/textField';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { post } from '../../../api/post';
import { authorizedUpdate } from '../../../api/authorizedUpdate'
import { authorizedPost } from '../../../api/authorizedPost'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea';
//
const { height } = Dimensions.get('window');
///
const EditProfileScreen = ({ route }) => {
    const [selectedImage, setSelectedImage] = useState(route?.params?.user?.profileImage);
    const [imgUploadObj, setImgUploadObj] = useState({})
    const [user, setUser] = useState(route?.params?.user)
    const intialValues = { fullName: route?.params?.user?.fullName, email: route?.params?.user?.email }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error2, setError2] = useState(false)
    const { goBack } = useNavigation()
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const pickImageAsync = async () => {
        let result = await ImagePickers.launchImageLibraryAsync({
            mediaTypes: ImagePickers.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setImgUploadObj({
                uri: result.assets[0]?.uri,
                type: result.assets[0]?.mimeType || 'image/jpeg',
                name: result.assets[0]?.uri.split('/').pop(),
            })
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
            updateProfileImage()
            const { result } = await authorizedUpdate("authenticate/updateProfileData", setError, setLoading, JSON.stringify(values))
            if (result?.message == "User Data Updated Successfully") {
                goBack()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfileImage = async () => {
        try {
            const uploadProfileImageFormData = new FormData();
            console.log(imgUploadObj);
            uploadProfileImageFormData.append("file", imgUploadObj);

            const { result } = await authorizedUpdate(
                "authenticate/uploadProfileImage",
                setError2,
                setLoading2,
                uploadProfileImageFormData
            );

            if (result?.message == "User Profile Image Updated Successfully") {

            }

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };


    const checkLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(value === 'true');
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoggedIn(false); // Default value if fetching fails
        }
    };
    useEffect(() => {

        checkLoggedIn();
    }, []); // Empty dependency array to run only once on component mount
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
                <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
                    {/* Head */}
                    <View style={styles.head}>
                        <SubHeader title="Edit Profile" showNotification={false} />
                    </View>
                    {/* Body */}
                    <View style={styles.body}>
                        {/* profile container */}
                        <View style={styles.profileCon}>
                            <ImageViewer
                                isLoggedIn={isLoggedIn}
                                image={selectedImage}
                                style={styles.imageCon}

                            />
                            {/* <CustomBtn title="Edit Image" onClickHandler={pickImage} /> */}
                            <Pressable onPress={pickImage}>
                                <Text style={[SIZES2.text_md, { color: COLORS.linkColor }]}>Edit Image</Text>
                            </Pressable>
                        </View>
                        <Devider height={35} />
                        {/* form container */}
                        <Formik
                            onSubmit={onSaveChanges}
                            initialValues={intialValues}
                        // validationSchema={loginValidationSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={styles.formCon}>
                                        <ListHeader title="Personal Info" />
                                        <TextInput
                                            label="Full Name"
                                            keyboardType="default"
                                            placeholder="xxxxxxxxx"
                                            value={values.fullName}
                                            onChangeText={handleChange("fullName")}
                                            error={errors?.fullName ? true : false}
                                            mode='flat'
                                            style={{ backgroundColor: "#fff" }}
                                        />
                                        <TextInput
                                            label="Email"
                                            keyboardType="email-address"
                                            placeholder="xxx@gmail.com"
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            error={errors?.email ? true : false}
                                            mode='flat'
                                            style={{ backgroundColor: "#fff" }}
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
                                        <CustomBtn loading={loading && loading2} title="Save Changes" onClickHandler={handleSubmit} />
                                    </View>
                                )
                            }}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
//
export default EditProfileScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
    head: {
        width: '100%',
        // paddingBottom: '5%',
        padding: LAY_OUT.padding,
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
        paddingHorizontal: LAY_OUT.padding,
        rowGap: 13
    },

    inputCon: {
        borderBottomWidth: 1,
        paddingBottom: '3%'
    },
})
//