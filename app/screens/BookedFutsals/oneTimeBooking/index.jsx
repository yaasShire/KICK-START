import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { authorizedGet } from '../../../api/authorizedGet'
import { useFocusEffect } from '@react-navigation/native'
import { BookedFutsalCards } from '../../../components'
import { appLayout, COLORS, LAY_OUT, SIZES2 } from '../../../theme/globalStyle'
import noBookingVenueFound from '../../../../assets/images/Futsals/venue_not_found.png'

const OneTimeBooking = ({ route }) => {
    // 
    const [oneTimeBookings, setOneTimeBookings] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const getOneTimeBooking = async () => {
        try {
            const { result } = await authorizedGet("booking/one-time", setError, setLoading)
            console.log("resultt-->", result);
            setOneTimeBookings(result)
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getOneTimeBooking()
        }, [])
    )

    // 
    return (
        <View style={styles.container}>
            <FlatList
                data={oneTimeBookings}
                keyExtractor={(item, index) => item.id}
                contentContainerStyle={{ rowGap: 10, padding: LAY_OUT.paddingX }}
                renderItem={({ item }) => <BookedFutsalCards data={item} />}
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

export default OneTimeBooking


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
        width: "100%"
    }
})