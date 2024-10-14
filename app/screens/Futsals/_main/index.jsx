//
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT, SIZES2, appLayout } from '../../../theme/globalStyle';
import { Devider, Header, SearchingBtn, Container, FutsalCards, BookedFutsalCards, ListHeader } from '../../../components';
import { Dimensions, ScrollView, StatusBar, StyleSheet, SafeAreaView, Text, View, Image, Button, FlatList, Platform, ActivityIndicator } from 'react-native';
import { nearByFutsalsData } from '../../../data';
import useFechtDataWithOutToken from '../../../api/getData';
import notFoundFutsalImage from '../../../../assets/images/Futsals/notFound.png'
import { get } from '../../../api/get';
import SearchHeader from '../../../components/SearchingBtn';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView as SafeAreaViewAndroidView } from 'react-native-safe-area-context';

//
const { width, height } = Dimensions.get('window');
//
const FutsalsScreen = ({ route }) => {
    const { navigate } = useNavigation();
    const [locationPermision, setLocationPermision] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [venues, setVenues] = useState([])
    const viewAll = () => {
        alert('View All')
    }

    // get all venues
    // const { data: allVenues, loading:loading1, error:error1, refetchData } = useFechtDataWithOutToken('venue/get');

    const getVenues = async () => {
        setLoading(true)
        const { result } = await get("venue/get", setError, setLoading)
        setVenues(result)
    }

    useFocusEffect(
        useCallback(() => {
            getVenues()
        }, [])
    )

    const onSearch = () => {
        navigate('Searching')
    }
    const onFilter = () => {
        navigate('Filtering')
    }

    return (
        <View style={styles.mainContainer}  >
            {
                Platform.OS == 'android' ?
                    <SafeAreaViewAndroidView />
                    : <SafeAreaView />
            }
            <StatusBar barStyle="dark-content" />
            <SearchHeader onSearch={onSearch} onFilter={onFilter} />
            <ScrollView nestedScrollEnabled={false} style={styles.scrollCon} contentContainerStyle={{ rowGap: 15 }} showsVerticalScrollIndicator={false}>
                {/* Body */}
                <View style={styles.body}>
                    {/* <Devider /> */}
                    {
                        !loading ?
                            <FlatList
                                scrollEnabled={false}
                                data={venues}
                                keyExtractor={(item, index) => item.id}
                                contentContainerStyle={styles.flatListCon}
                                renderItem={({ item }) => <FutsalCards {...item} data={item} />}
                                // ListHeaderComponent={() => <ListHeader title="All Futsals" numOfVenues={venues?.length} textButton={nearByFutsalsData.length} />}
                                ListEmptyComponent={() => (
                                    <View style={{ justifyContent: "center", alignItems: "center", rowGap: 10 }}>
                                        <Image source={notFoundFutsalImage} style={{ width: 60, height: 60, resizeMode: "cover" }} />
                                        <Text style={[SIZES2.text_sm, { opacity: .7 }]}>Not Venue Found</Text>
                                    </View>
                                )}
                            />
                            : <ActivityIndicator size={'small'} color={COLORS.primary_color} />
                    }
                    <Devider />
                </View>
            </ScrollView>
        </View>
    )
}
//
export default FutsalsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    scrollCon: {
        // paddingBottom: '15%'
    },
    head: {
        width: '100%',
        // paddingBottom: '5%',
        zIndex: 0,
        paddingHorizontal: LAY_OUT.padding,
    },
    body: {
        flex: 1,
        zIndex: 1000,
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary
    },
    flatListCon: {
        rowGap: 5,
        paddingHorizontal: LAY_OUT.padding
    },
    nearByFutsalsCardCon: {
        columnGap: 10,
        paddingHorizontal: appLayout.padding,
    },
    allFutsalsCon: {
        rowGap: 20,
        paddingHorizontal: appLayout.paddingX
    },
    searchWrapper: {
        // paddingHorizontal: LAY_OUT.paddingX
    }
})
//