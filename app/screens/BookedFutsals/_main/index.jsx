//
import React, { useCallback, useState } from 'react';
import { bookedFutsalsData } from '../../../data';
import { appLayout, COLORS, LAY_OUT, SIZES2 } from '../../../theme/globalStyle';
import { BookedFutsalCards, Devider, Header, ListHeader } from '../../../components';
import { FlatList, Image, ScrollView, SectionList, StyleSheet, Text, View, Platform } from 'react-native';
import { authorizedGet } from '../../../api/authorizedGet';

import { useFocusEffect } from '@react-navigation/native';
import GorhomBottomSheet from '../../../components/GorhomBottomSheet';
import noBookingVenueFound from '../../../../assets/images/Futsals/venue_not_found.png'
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea';
import OrdersTopTabsForCustomer from '../orderTopTabsForCustomer';
//
const BookedFutsalsScreen = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [bookedVenues, setBookedVenues] = useState([])
    const [oneTimeBookings, setOneTimeBookings] = useState([])
    const [recurringBookings, setRecurringBookings] = useState([])

    // const getBookedFutsals = async () => {
    //     try {
    //         const { result } = await authorizedGet("booking/getBookingByCustomerId", setError, setLoading)
    //         console.log("resultt-->", result[1]);

    //         setOneTimeBookings(result[1])
    //         setRecurringBookings(result[3])
    //         setBookedVenues(result)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useFocusEffect(
    //     useCallback(() => {
    //         getBookedFutsals()
    //     }, [])
    // )

    //
    return (
        <View style={styles.mainContainer}>
            <IosAndroidSafeArea />
            <View style={styles.head}>
                <Header title="Booked Futsals" />
            </View>
            <OrdersTopTabsForCustomer />
        </View>
    )
}
//
export default BookedFutsalsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
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
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary
    },
    flatListCon: {
        rowGap: 20,
        paddingHorizontal: LAY_OUT.padding
    },
    emptyStateWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }
})
//