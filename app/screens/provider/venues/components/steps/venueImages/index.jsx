import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../../theme/globalStyle'
import uploadImg from '../../../../../../../assets/images/upload.png'
import VenueImageItem from '../../venueImgItem'
import { nearByFutsalsData } from '../../../../../../data'
import { Button, Snackbar } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux'
import { addBasicVenueData, addCoordinate, addVenueAddress, addVenueImages, removeFacility, removeVenueImage } from '../../../../../../redux/venue'
import upload_image from '../../../../../../../assets/images/upload_image.png'
import { venueRegistrationFormDataGenerator, generageVenueRegistrationData } from '../../../../../../utilities/index'
import { authorizeProviderGet } from '../../../../../../api/authorizedProviderGet'
import { authorizedProviderPost } from '../../../../../../api/authorizedProviderPost'
const VenueImages = ({ setCurrentPosition = () => { }, venueRegistrationRef }) => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [uploadError, setUploadError] = useState(false)
    const [error, setError] = useState(false)
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    //get venue data
    const venueBasicData = useSelector(state => state?.venueSlice?.venueRegistration?.basicVenueData)
    const venueAddressData = useSelector(state => state?.venueSlice?.venueRegistration?.venueAddress)
    const venueFacilities = useSelector(state => state?.venueSlice?.venueRegistration?.facilities)
    const venueImages = useSelector(state => state?.venueSlice?.venueRegistration?.venueImages)
    const venueRegions = useSelector(state => state?.venueSlice?.venueRegistration?.regions)
    const venueCity = useSelector(state => state?.venueSlice?.venueRegistration?.city)
    const venueCoordinate = useSelector(state => state?.venueSlice?.venueRegistration?.coordinate)



    const clearnVenueRegistrationSlice = () => {
        dispatch(addBasicVenueData({}))
        dispatch(addVenueAddress({}))
        dispatch(removeVenueImage([]))
        dispatch(removeFacility([]))
        dispatch(addCoordinate({
            latitude: "", // Initial latitude (e.g., Mogadishu)
            longitude: ""
        }))
    }

    //
    const pickImages = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            dispatch(addVenueImages(result.assets.map(asset => ({
                uri: asset?.uri,
                type: asset?.mimeType || 'image/jpeg',
                name: asset?.uri.split('/').pop(),
            }))))
        }
    };

    const removeImage = (uri = "") => {
        // productImages?.filter(asset => asset?.uri != data?.uri)
        const filteredImages = venueImages?.filter(img => img?.uri != uri && img)
        console.log(uri, filteredImages);
        dispatch(removeVenueImage(filteredImages))
    }

    const uploadVenue = async () => {
        try {
            // console.log(venueBasicData);
            setLoading(true)
            const generatedVenueData = generageVenueRegistrationData(venueBasicData, venueAddressData, venueFacilities, venueRegions, venueCity, venueCoordinate)
            const generatedFormData = venueRegistrationFormDataGenerator(generatedVenueData, venueImages)

            const { result } = await authorizedProviderPost("venue/create", setUploadError, setLoading, generatedFormData)
            console.log(result);
            if (result?.message == "Venue Created Successfully") {
                clearnVenueRegistrationSlice()
                venueRegistrationRef?.current?.close()
                setCurrentPosition(0)
            }
            if (result?.message == `Venue with name '${venueBasicData?.name}' exists`) {
                setError(result?.message)
                setVisible(true)
            }
            if (result?.status == "BAD_REQUEST") {
                setError(result?.message)
                setVisible(true)
            }

            //
            if (venueImages?.length == 0) {
                setError("Add at least 4 Venue images")
                setVisible(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View >
                    <View style={styles.subWrapper}>
                        <View style={styles.titleWrapper}>
                            <Text style={[SIZES2.text_md, { fontFamily: "poppins400", color: "rgba(0, 0, 0, .7)" }]}>Uplod Venue Images by clicking upload Button</Text>
                        </View>
                        <TouchableOpacity style={styles.uploadImgsWrapper} onPress={() => {
                            if (!loading) {
                                pickImages()
                            }
                        }}>
                            <View style={styles.uploadImgs}>
                                <Image source={uploadImg} style={styles.uploadImg} />
                                <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", color: "rgba(0, 0, 0, 1" }]}>Uplod Venue Images</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.imgsWrapper}>
                            {
                                venueImages?.map(item => (
                                    <VenueImageItem key={item?.uri} img={item?.uri} removeImage={removeImage} />
                                ))
                            }
                        </View>
                        {
                            venueImages?.length == 0 &&
                            <View style={styles.placeHolderImgWrapper}>
                                <Image source={upload_image} style={styles.uploadImg2} />
                                <Text style={[SIZES2.text_sm, { color: "rgba(0, 0, 0, .8)", fontFamily: "poppins400" }]}>No Venue Image Found, upload some photos</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.btns}>
                        <Button mode='contained-tonal' style={{ padding: 3 }} onPress={() => {
                            if (!loading) {
                                setCurrentPosition(2)
                            }

                        }}>Prev</Button>
                        <Button mode='contained' style={{ padding: 3, backgroundColor: COLORS.primary_color }} onPress={uploadVenue}>
                            {
                                loading ?
                                    <ActivityIndicator size={'small'} color={"#fff"} />
                                    :
                                    <Text>Upload</Text>
                            }
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Venue Upload Failed',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {error}
            </Snackbar>
        </View>
    )
}

export default VenueImages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // rowGap: 25,
        // justifyContent: "space-between",
    },
    subWrapper: {
        rowGap: 25,
        paddingBottom: 15
    },
    uploadImgsWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    titleWrapper: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: LAY_OUT.paddingX,
    },
    uploadImgs: {
        backgroundColor: "rgba(0, 0, 0, .06)",
        width: "90%",
        height: 140,
        padding: LAY_OUT.padding,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        rowGap: 3
    },
    uploadImg: {
        width: 80,
        height: 70,
        resizeMode: "contain"
    },
    imgsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: LAY_OUT.padding,
        rowGap: 2
    },
    btns: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: LAY_OUT.paddingX,
        // marginTop: 40,
        marginBottom: 20
    },
    placeHolderImgWrapper: {
        alignItems: "center",
        rowGap: 10
    },
    uploadImg2: {
        width: 140,
        height: 100,
        resizeMode: "center"
    }
})