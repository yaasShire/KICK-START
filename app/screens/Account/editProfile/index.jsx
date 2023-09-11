//
import React, { useState } from 'react';
import * as ImagePickers from 'expo-image-picker';
import { nearByFutsalsData } from '../../../data';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { BookedFutsalCards, CustomBtn, CustomInput, Devider, FutsalCards, ImageViewer, ListHeader, SubHeader } from '../../../components';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
//
import TextField from 'react-native-ui-lib/textField';
//
const { height } = Dimensions.get('window');
///
const EditProfileScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
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
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <SubHeader title="Edit Profile" />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider />
                    {/* profile container */}
                    <View style={styles.profileCon}>
                        <ImageViewer
                            image={selectedImage}
                            style={styles.imageCon}
                        />
                        <CustomBtn title="Edit Image" onClickHandler={pickImage} />
                    </View>
                    <Devider height={35} />
                    {/* form container */}
                    <View style={styles.formCon}>
                        <ListHeader title="Personal Info" />
                        <Devider />
                        <TextField
                            text65R
                            floatOnFocus
                            floatingPlaceholder
                            placeholder={'Full Name'}
                            onChangeText={onChangeText}
                            containerStyle={styles.inputCon}
                            defaultValue="Abdirahman Abdirashid"
                        />
                        <Devider />
                        <TextField
                            text65R
                            floatOnFocus
                            floatingPlaceholder
                            onChangeText={onChangeText}
                            placeholder={'Phone Number'}
                            fieldStyle={styles.fieldsStyle}
                            containerStyle={styles.inputCon}
                            defaultValue="252 61 5 094 596"
                        />
                        <Devider />
                        <TextField
                            text65R
                            floatOnFocus
                            floatingPlaceholder
                            onChangeText={onChangeText}
                            placeholder={'Email'}
                            fieldStyle={styles.fieldsStyle}
                            containerStyle={styles.inputCon}
                            defaultValue="abdirahmanabdirashid429@gmail.com"
                        />
                        <Devider />
                        <TextField
                            text65R
                            floatOnFocus
                            floatingPlaceholder
                            onChangeText={onChangeText}
                            placeholder={'Phone Number'}
                            fieldStyle={styles.fieldsStyle}
                            containerStyle={styles.inputCon}
                            defaultValue="252 61 5 094 596"
                        />
                        <Devider />
                        <TextField
                            text65R
                            floatOnFocus
                            floatingPlaceholder
                            onChangeText={onChangeText}
                            placeholder={'Phone Number'}
                            fieldStyle={styles.fieldsStyle}
                            containerStyle={styles.inputCon}
                            defaultValue="252 61 5 094 596"
                        />
                        <Devider height={30} />
                        <CustomBtn title="Save Changes" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default EditProfileScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: appLayout.padding,
        backgroundColor: COLORS.primary_color
    },
    body: {
        flex: 1,
        zIndex: 1000,
        padding: '3%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_tertiary
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