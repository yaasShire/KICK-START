import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { authorizedGet } from '../../../api/authorizedGet'
import { appLayout, COLORS, LAY_OUT, SIZES2 } from '../../../theme/globalStyle'
import { BookedFutsalCards } from '../../../components'
import noBookingVenueFound from '../../../../assets/images/Futsals/venue_not_found.png'
import OrderCardExpandable from '../../../components/orderCardExpandable'

// 
const RecurringBooking = () => {
    // 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [recurringBookings, setRecurringBookings] = useState([])

    const getRecurringBooking = async () => {
        try {
            const { result } = await authorizedGet("booking/recurring", setError, setLoading)
            // console.log("resultt-->", result[0]?.recurringBookings);
            setRecurringBookings(result)
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getRecurringBooking()
        }, [])
    )

    // 
    return (
        <View style={styles.container}>
            <FlatList
                data={recurringBookings}
                keyExtractor={(item, index) => item?.parentBookingId}
                // contentContainerStyle={styles.flatListCon}
                contentContainerStyle={{ rowGap: 10, padding: LAY_OUT.paddingX }}
                renderItem={({ item }) => <OrderCardExpandable data={item} />}
                // ListHeaderComponent={() => <ListHeader title="Booked Futsals" />}
                ListEmptyComponent={() => (
                    <View style={styles.emptyStateWrapper}>
                        <Text style={[SIZES2.text_sm]}>No Booked Venues</Text>
                        <Image source={noBookingVenueFound} style={{ width: 150, height: 150, resizeMode: "contain" }} />
                    </View>
                )}
            />
        </View>
    )
}

export default RecurringBooking


// 
const styles = StyleSheet.create({
    container: {
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
        width: "100%",
    }
})