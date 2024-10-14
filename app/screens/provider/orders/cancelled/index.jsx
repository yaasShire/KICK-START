import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import OrderCard from '../../components/orderCard'
import GorhomBottomSheet from '../../../../components/GorhomBottomSheet'
import OrderDetail from '../../components/oderDetail'
import AcceptOrderModal from '../../components/acceptOrderModal'
import RejectOrderModal from '../../components/rejectOrderModal'
import { LAY_OUT } from '../../../../theme/globalStyle'
import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList } from 'react-native'
import EmptyC from '../../components/emptyC'
import { Divider } from 'react-native-paper'
import { authorizedProviderUpdate } from '../../../../api/authorizedProviderUpdate'
import BookingResponseActionModal from '../../components/bookingActionResponseModal'

const CancelledOrders = () => {
    const orderRef = useRef()
    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const [rejectOrderModal, setRejectOrderModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [bookingOrders, setBookingOrders] = useState([])
    const [bookingResponseActionModal, setBookingResponseActionModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [bookingResponseText, setBookingResponseText] = useState({
        title: "",
        description: ""
    })


    const onOrderCardLick = (item = {}) => {
        setSelectedOrder(item)

        orderRef.current?.expand()
    }
    const getPendingOrders = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getCancelledOrders", setError, setLoading)
            console.log(result);
            setBookingOrders(result?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const acceptOrder = async () => {
        try {
            const { result } = await authorizedProviderUpdate(`booking/accept/${selectedOrder?.orderId}`, setError, setLoading)
            if (result?.message == "Booking Confirmed Successfully") {
                setBookingResponseText({
                    title: result?.message,
                    description: "You have confirmed this order and the user is being notified"
                })
                setBookingResponseActionModal(true)
                setTimeout(() => {
                    setBookingResponseActionModal(false)
                    setBookingResponseText({ title: "", description: "" })
                }, 3500)
                getPendingOrders()
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    const rejectOrder = async () => {
        try {
            const { result } = await authorizedProviderUpdate(`booking/cancel/${selectedOrder?.orderId}`, setError, setLoading)
            console.log(result);
            if (result?.message == "Booking Canceled Successfully") {
                setBookingResponseText({
                    title: result?.message,
                    description: "You have cancelled this order and the user is being notified"
                })
                setBookingResponseActionModal(true)
                setTimeout(() => {
                    setBookingResponseActionModal(false)
                    setBookingResponseText({ title: "", description: "" })
                }, 3500)
                getPendingOrders()
            }
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getPendingOrders()
        }, [])
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={bookingOrders}
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
                    <EmptyC title='No Pending Orders Found!' />
                )}
            />
            <GorhomBottomSheet sheetRef={orderRef} snapPoints={["78%"]}>
                <OrderDetail selectedOrder={selectedOrder} />
            </GorhomBottomSheet>
            <AcceptOrderModal acceptOrderModal={acceptOrderModal} setAcceptOrderModal={setAcceptOrderModal} acceptOrder={acceptOrder} />
            <RejectOrderModal rejectOrderModal={rejectOrderModal} setRejectOrderModal={setRejectOrderModal} rejectOrder={rejectOrder} />
            <BookingResponseActionModal bookingResponseActionModal={bookingResponseActionModal} setBookingResponseActionModal={setBookingResponseActionModal} bookingResponseText={bookingResponseText} />
        </View>
    )
}

export default CancelledOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})