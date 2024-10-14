//
import React, { useCallback, useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { Devider, ListHeader } from '../../../components';
import { amenities, nearByFutsalsData } from '../../../data';
import { appLayout, COLORS, screenHeight, SIZES2 } from '../../../theme/globalStyle';
import { AmenitiesCard, CourtsCard, FutsalInfoCard, ImageCarousel } from './components';
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import useFechtDataWithOutToken from '../../../api/getData';
import notFoundFutsalImage from '../../../../assets/images/Futsals/notFound.png'
import { get } from '../../../api/get';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Divider } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

//
const DetailsScreen = ({ route }) => {
    const futsalInfo = route.params;
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [courts, setCourts] = useState([])
    const [venue, setVenue] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const { goBack } = useNavigation()

    const [mapRegion, setMapRegion] = useState({
        latitude: "37.78825",
        longitude: "-122.4324",
        latitudeDelta: "0.0922",
        longitudeDelta: "0.0421",
    })

    const checkLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(value === 'true');
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoggedIn(false); // Default value if fetching fails
        }
    };

    const getVenueCourts = async () => {
        const { result } = await get(`court/getCourtsByVenueId/${route?.params?.id}`, setError, setLoading)
        setCourts(result)
    }
    const venueId = route?.params?.id
    const getSingleVenue = async () => {
        const { result } = await get(`venue/getSingleVenue/${route?.params?.id}`, setError, setLoading)
        setVenue(result)
    }
    useFocusEffect(
        useCallback(() => {
            getVenueCourts()
            getSingleVenue()
            checkLoggedIn()
        }, [route?.params?.id, route])
    )
    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black_color} />
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <ImageCarousel images={venue?.images} />
                    <View style={styles.btnBack}>
                        <Appbar.BackAction size={17} iconColor={"#000"} onPress={() => {
                            goBack()
                        }}
                            style={{ backgroundColor: COLORS.bg_tertiary }}
                        >
                        </Appbar.BackAction>
                    </View>
                </View>
                {/* Body */}
                <View style={styles.body}>
                    {/* Futsal Information Card */}
                    <FutsalInfoCard {...futsalInfo} data={venue} />
                    <Devider />
                    {/* Amenities  */}
                    <ListHeader title="Amenities" />
                    <Devider height={15} />
                    <FlatList
                        horizontal
                        data={venue?.facilities}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.FlatListCon}
                        renderItem={({ item }) => <AmenitiesCard {...item} data={item} />}
                    />
                    <Divider />
                    <Devider height={20} />
                    {/* Futsal daily working Time Card */}
                    <View style={styles.futsalOpensTimeCon}>
                        <Text style={[styles.timeTxt, SIZES2.text_sm, { color: "#fff" }]}>
                            Venue Schedule :
                        </Text>
                        <Text style={[styles.timeTxt, SIZES2.text_sm, { color: "#fff" }]}>
                            {futsalInfo?.openTime} to {futsalInfo?.closeTime}
                        </Text>
                    </View>
                    <Devider height={20} />
                    {/* Futsal Grounds Card */}
                    <FlatList
                        scrollEnabled={false}
                        data={courts}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.courtsFlatListCon}
                        renderItem={({ item }) => <CourtsCard isLoggedIn={isLoggedIn} {...item} data={item} venueId={route?.params?.id} venueCity={venue?.city} venueAddress={venue?.address} distance={route?.params?.distance} />}
                        ListHeaderComponent={() => <ListHeader title={`${futsalInfo?.futsalName} Grounds`} />}
                        ListEmptyComponent={() => (
                            <View style={{ justifyContent: "center", alignItems: "center", rowGap: 10 }}>
                                <Image source={notFoundFutsalImage} style={{ width: 100, height: 100, resizeMode: "cover" }} />
                                <Text style={[SIZES2.text_sm, { opacity: .7 }]}>Not Court Found For This Venue!!</Text>
                            </View>
                        )}
                    />
                    {/* Map View */}
                    <Devider />
                    {/* <ListHeader title="Location" textButton={route?.params?.distance?.toFixed(2) == 0 ? "Venue is near you" : route?.params?.distance?.toFixed(2) + "km away for you"} /> */}
                    {/* <Devider height={12} /> */}
                    {/* <MapView
                        region={mapRegion}
                        style={styles.map}
                    /> */}
                </View>
            </ScrollView>
        </View >
    )
}
//
export default DetailsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    head: {
        zIndex: 0,
        // width: '100%',
        backgroundColor: COLORS.bg_tertiary,
        height: screenHeight / 2.5
    },
    btnBack: {
        position: "absolute",
        top: 30
    },
    body: {
        flex: 1,
        zIndex: 1000,
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: appLayout.padding,
        backgroundColor: COLORS.bg_primary
    },
    FlatListCon: {
        columnGap: 20,
        paddingVertical: '3%',
        // borderTopWidth: 0.5,
        // borderBottomWidth: 0.5,
        borderColor: COLORS.gray_color
    },
    futsalOpensTimeCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.black900
    },
    timeTxt: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff'
    },
    courtsFlatListCon: {
        rowGap: 20
    },
    map: {
        height: 180,
        borderRadius: 7
    }
})
//