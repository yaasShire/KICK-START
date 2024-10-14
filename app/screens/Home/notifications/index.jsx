//
import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Devider, ListEmptyComponent, ListHeader, SubHeader } from '../../../components';
import { notifigations } from '../../../data';
import { appLayout, COLORS, LAY_OUT } from '../../../theme/globalStyle';
import { NotificationCards } from './components';
import { authorizedGet } from '../../../api/authorizedGet';
import { useFocusEffect } from '@react-navigation/native';
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea';
//
const NotificationScreen = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [notifications, setNotifications] = useState([])

    const getBookedFutsals = async () => {
        try {
            const { result } = await authorizedGet("booking/getBookingByCustomerId", setError, setLoading)
            // console.log("resultt-->", result);
            setNotifications(result)
        } catch (error) {
            console.log(error);
        }
    }


    useFocusEffect(
        useCallback(() => {
            getBookedFutsals()
        }, [])
    )

    //
    return (
        <View style={[styles.mainContainer]}>
            <IosAndroidSafeArea />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
                {/* Head */}
                <View style={styles.head}>
                    <SubHeader title="Notifications" showNotification={false} />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider />
                    <FlatList
                        scrollEnabled={false}
                        data={notifications}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <NotificationCards {...item} data={item} />}
                        ListEmptyComponent={() => <ListEmptyComponent message="No Saving Data Available" />}
                    // ListHeaderComponent={() => <ListHeader title="New" textButton={notifigations.length} />}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
//
export default NotificationScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
    head: {
        // width: '100%',
        // paddingBottom: '5%',
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    body: {
        flex: 1,
        zIndex: 1000,
        // padding: '3%',
        // paddingBottom: '7%',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary
    },
    flatListCon: {
        rowGap: 12,
        paddingHorizontal: LAY_OUT.padding
    }
})
//