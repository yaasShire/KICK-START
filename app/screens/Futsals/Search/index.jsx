//
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES2 } from '../../../theme/globalStyle';
import { useNavigation } from '@react-navigation/core';
import { Searchbar, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomInput, Devider, ListHeader } from '../../../components';
import { FlatList, Image, Pressable, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import SearchingCard from './components/SearchingCard';
import { nearByFutsalsData } from '../../../data';
import { get } from '../../../api/get';
import * as Location from 'expo-location';
import emptySearchImage from '../../../../assets/images/Futsals/emptySearch.png'
import { post } from '../../../api/post';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { calculateDistance } from '../../../utilities';
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea';
//
const SearchingScreen = () => {
    const { navigatem, goBack } = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [venues, setVenues] = useState([])
    const [location, setLocation] = useState({})
    const onChangeSearch = query => setSearchQuery(query);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error2, setError2] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [clickedVenueId, setClickedVenueId] = useState(null)
    const { navigate } = useNavigation()
    const searchVenues = async () => {
        try {
            setLoading(true)
            const result = await get(`venue/search?name=${searchQuery}`, setError, setLoading)
            setVenues(result?.result)

        } catch (error) {
            console.log(error);
        }
    }
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
    useEffect(() => {
        searchVenues()
    }, [searchQuery])



    const saveSearchedVenue = async (data = {}) => {
        try {
            let distance = 0
            if (location?.latitude && location?.longitude) {
                distance = calculateDistance(location.latitude, location?.longitude, Number(data?.latitude), Number(data?.longitude));
            }
            const payload = {
                query: data?.name,
                clickedVenueId: data?.id,
                deviceId: `${Platform.Version}_${Platform.OS}`
            }
            const result = await post(`venue/saveSearchedVenue`, setError, setLoading, JSON.stringify(payload))
            console.log(result, payload);
            if (result?.result?.message == "Searched Venue Saved Successfully") {
                navigate('FutsalsStack', {
                    screen: 'Details',
                    initial: false,
                    params: {
                        id: data?.id, futsalName: data?.name, distance, address: data?.address, numberOfCourts: data?.numberOfCourts, numberOfHoursOpen: data?.numberOfHoursOpen, imageUrl: "",
                        description: data?.description, openTime: data?.openTime, closeTime: data?.closeTime
                    }
                })
            }
            if (result?.result?.message == "Venue Save Already") {
                navigate('FutsalsStack', {
                    screen: 'Details',
                    initial: false,
                    params: {
                        id: data?.id, futsalName: data?.name, distance, address: data?.address, numberOfCourts: data?.numberOfCourts, numberOfHoursOpen: data?.numberOfHoursOpen, imageUrl: "",
                        description: data?.description, openTime: data?.openTime, closeTime: data?.closeTime
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSavedSearchVenues = async () => {
        try {
            const payload = {
                deviceId: `${Platform.Version}_${Platform.OS}`
            }
            console.log(payload);
            const result = await post("venue/getSavedSearchVenues", setError2, setLoading2, JSON.stringify(payload))
            setVenues(result?.result?.map(item => item?.clickedVenue))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSavedSearchVenues()
    }, [searchQuery == ""])
    //
    return (
        <View style={styles.mainContainer}>
            <IosAndroidSafeArea />
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg_primary} />
            <View style={styles.head}>
                <Pressable onPress={() => goBack()}>
                    <Ionicons name="close-sharp" size={33} color={COLORS.black900} />
                </Pressable>
                <Searchbar
                    focusable={true}
                    value={searchQuery}
                    style={styles.searchStyle}
                    placeholder="Search here..."
                    onChangeText={onChangeSearch}
                    loading={loading}
                    inputStyle={{ height: 30, alignSelf: 'center' }}
                />
            </View>
            <ScrollView style={styles.scrollCon}>
                <Devider />
                <FlatList
                    scrollEnabled={false}
                    data={venues}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.FlatListCon}
                    renderItem={({ item }) => <SearchingCard {...item} data={item} location={location} saveSearchedVenue={saveSearchedVenue} />}
                    ListHeaderComponent={() => <ListHeader title="Recent Searchs" />}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={emptySearchImage} style={{ width: 100, height: 100, resizeMode: "cover" }} />
                            <Text style={[SIZES2.text_md, { opacity: .8, fontFamily: "poppins400" }]}>No Recent Searches!!</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    )
}
//
export default SearchingScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    head: {
        padding: '3%',
        columnGap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    searchStyle: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: COLORS.light_green_color,
        backgroundColor: COLORS.bg_primary,
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: COLORS.bg_primary
    },
    FlatListCon: {
        rowGap: 15
    }
})
//