import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import OrderCard from '../../components/orderCard'
import GorhomBottomSheet from '../../../../components/GorhomBottomSheet'
import OrderDetail from '../../components/oderDetail'
import AcceptOrderModal from '../../components/acceptOrderModal'
import RejectOrderModal from '../../components/rejectOrderModal'
import { LAY_OUT } from '../../../../theme/globalStyle'
import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import { useFocusEffect } from '@react-navigation/native'
import { Divider } from 'react-native-paper'
import EmptyC from '../../components/emptyC'

const ExpiredOrders = () => {
    const orderRef = useRef()
    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const [rejectOrderModal, setRejectOrderModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [confirmedBookingOrders, setConfirmedBookingOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState({})

    const onOrderCardLick = (item = {}) => {
        setSelectedOrder(item)
        // navigate("OrderDetail")
        // alert("h")

        orderRef.current?.expand()
    }

    const getExpiredOrders = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getExpiredOrders", setError, setLoading)
            console.log(result);
            setConfirmedBookingOrders(result?.data)
        } catch (error) {
            console.log(error);
        }
    }
    useFocusEffect(
        useCallback(() => {
            getExpiredOrders()
        }, [])
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={confirmedBookingOrders}
                contentContainerStyle={{ rowGap: 10, padding: LAY_OUT.paddingX }}
                renderItem={({ item }) => (
                    <View>
                        <OrderCard data={item} showActionsBtns onPress={() => onOrderCardLick(item)} setSelectedOrder={setSelectedOrder} setAcceptOrderModal={setAcceptOrderModal} setRejectOrderModal={setRejectOrderModal} />
                        <Divider />
                    </View>
                )}
                ListEmptyComponent={() => (
                    // <View style={styles.emptyCWrapper}>
                    //     <Image source={noOrderFound} style={styles.notFoundImg} />
                    //     <Text>No Recent Booking Orders Found!</Text>
                    // </View>
                    <EmptyC title='No Expired Orders Found!' />
                )}
            />
            <GorhomBottomSheet sheetRef={orderRef} snapPoints={["78%"]}>
                <OrderDetail selectedOrder={selectedOrder} />
            </GorhomBottomSheet>
            <AcceptOrderModal acceptOrderModal={acceptOrderModal} setAcceptOrderModal={setAcceptOrderModal} />
            <RejectOrderModal rejectOrderModal={rejectOrderModal} setRejectOrderModal={setRejectOrderModal} />
        </View>
    )
}

export default ExpiredOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})