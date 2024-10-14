//
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT, SIZES, SIZES2, appLayout } from '../../../theme/globalStyle';
import { bookedFutsalsData, nearByFutsalsData } from '../../../data';
import { NearByFutsalsCard, NearByLocationPermisionCard } from './components';
import { Devider, Header, SearchingBtn, Container, FutsalCards, BookedFutsalCards, ListHeader } from '../../../components';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View, Image, Button, FlatList, Platform } from 'react-native';
import axios from 'axios';
import useFechtDataWithOutToken from '../../../api/getData';
import * as Location from 'expo-location';
import usePostDataWithOutToken from '../../../api/postData';
import venue_not_found from '../../../../assets/images/Futsals/venue_not_found.png'
import { get } from '../../../api/get';
import { post } from '../../../api/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorizedGet } from '../../../api/authorizedGet'
import { useFocusEffect } from '@react-navigation/native'
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea';
//
const { width, height } = Dimensions.get('window');
//
const HomeScreen = ({ route }) => {
    const { navigate } = useNavigation();
    const viewAll = () => {
        navigate("FutsalsStack", { screen: "Futsals" })
    }
    //

    const [locationPermision, setLocationPermision] = useState(true)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [nearByVenues, setNearByVenues] = useState([])
    const [popularVenues, setPopularVenues] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState({})

    //fetch popular futsals
    // const { data: popularFutsals, loading: loading1, error: error1, refetchData } = useFechtDataWithOutToken('venue/popularVenues');

    //fetch near by futsals
    // const { data: nearByFutsals, loading: loading2, error: error2, refetchData: refetchData2 } = usePostDataWithOutToken('venue/nearByVenues');


    const getPopularVenues = async () => {
        const { result } = await get("venue/popularVenues", setError, setLoading)
        setPopularVenues(result)
    }
    const getNearByVenue = async () => {
        const coordinates = {
            latitude: location?.latitude,
            longitude: location?.longitude
        }
        const { result } = await post("venue/nearByVenues", setError, setLoading, JSON.stringify(coordinates))
        setNearByVenues(result)
    }
    const getProfileData = async () => {
        try {
            const { result } = await authorizedGet("authenticate/profileData", setError, setLoading)
            setUser(result)
        } catch (error) {
            console.log(error);
        }

    }


    // useEffect(() => {
    //     getPopularVenues()
    //     getNearByVenue()
    // }, [location])
    useFocusEffect(
        useCallback(() => {
            getPopularVenues()
            getNearByVenue()
        }, [location])
    )
    // get current user location coordinate
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync(
                {
                    accessPrivilege: 'We need your location to provide personalized recommendations.',
                }
            );
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location?.coords);
        })();
    }, []);
    //
    const checkLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(value === 'true');
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoggedIn(false); // Default value if fetching fails
        }
    };
    useFocusEffect(
        useCallback(() => {
            getProfileData()
            checkLoggedIn();
        }, [])
    );

    if (isLoggedIn === null) {
        // Still fetching data
        return null; // or loading indicator
    }




    // 
    return (
        <View style={styles.mainContainer}>
            <IosAndroidSafeArea />

            <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary_color} />
            <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <Header user={user} />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    {
                        nearByVenues.length > 0 ?
                            (
                                // locationPermision == true ?
                                <Container title="Nearby Futsals" viewAll="View All" onViewAll={viewAll}>
                                    <FlatList
                                        horizontal
                                        data={nearByVenues}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.nearByFutsalsCardCon}
                                        renderItem={({ item }) => <NearByFutsalsCard {...item} data={item} location={location} />}
                                    />
                                </Container>
                                // :
                                // <NearByLocationPermisionCard />
                            ) : null
                    }
                    {/* <Devider /> */}
                    <FlatList
                        scrollEnabled={false}
                        data={popularVenues}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <FutsalCards data={item} location={location} isLoggedIn={isLoggedIn} user={user} getPopularVenues={getPopularVenues} />}
                        ListHeaderComponent={() => <ListHeader title="Popular Futsals" />}
                        ListEmptyComponent={() => <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image source={venue_not_found} style={{ resizeMode: "cover", width: "100%", height: height / 3 }} />
                            <Text style={[SIZES2.text_md]}>No Venue Found!!</Text>
                        </View>}
                    />
                    <Devider />
                    {/* <Text>
                        Show More
                    </Text> */}
                </View>
            </ScrollView>
        </View>
    )
}
//
export default HomeScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    scrollCon: {
        flex: 1,
        // paddingBottom: '15%'
    },
    head: {
        width: '100%',
        paddingBottom: '5%',
        zIndex: 0,
        padding: appLayout.padding,
        backgroundColor: COLORS.bg_primary
    },
    body: {
        flex: 1,
        zIndex: 1000,
        // paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // backgroundColor: COLORS.bg_tertiary
    },
    nearByFutsalsCardCon: {
        columnGap: 12,
        paddingHorizontal: LAY_OUT.paddingX,
    },
    popularFutsalsCon: {
        rowGap: 20,
        paddingHorizontal: appLayout.paddingX
    },
    flatListCon: {
        rowGap: 20,
        paddingHorizontal: LAY_OUT.padding
    }
})
//