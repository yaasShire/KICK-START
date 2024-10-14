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
import { authorizedProviderUpdate } from '../../../../api/authorizedProviderUpdate'

const ConfirmedOrders = () => {
    const orderRef = useRef()
    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const [rejectOrderModal, setRejectOrderModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [confirmedBookingOrders, setConfirmedBookingOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState({})
    const [bookingResponseActionModal, setBookingResponseActionModal] = useState(false)
    const [bookingResponseText, setBookingResponseText] = useState({
        title: "",
        description: ""
    })

    const onOrderCardLick = (item = {}) => {
        setSelectedOrder(item)
        // navigate("OrderDetail")
        // alert("h")

        orderRef.current?.expand()
    }

    const getConfirmedOrders = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getConfirmedOrders", setError, setLoading)
            console.log(result);
            setConfirmedBookingOrders(result?.data)
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
                getConfirmedOrders()
            }
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getConfirmedOrders()
        }, [])
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={confirmedBookingOrders}
                contentContainerStyle={{ rowGap: 10, padding: LAY_OUT.paddingX }}
                renderItem={({ item }) => (
                    <View>
                        {/* <OrderCard data={item} showActionsBtns showCancelOrder onPress={() => onOrderCardLick(item)} setSelectedOrder={setSelectedOrder} setAcceptOrderModal={setAcceptOrderModal} setRejectOrderModal={setRejectOrderModal} /> */}
                        <OrderCard data={item} showActionsBtns onPress={() => onOrderCardLick(item)} showCancelOrder setSelectedOrder={setSelectedOrder} setAcceptOrderModal={setAcceptOrderModal} setRejectOrderModal={setRejectOrderModal} />

                        <Divider />
                    </View>
                )}
                ListEmptyComponent={() => (
                    // <View style={styles.emptyCWrapper}>
                    //     <Image source={noOrderFound} style={styles.notFoundImg} />
                    //     <Text>No Recent Booking Orders Found!</Text>
                    // </View>
                    <EmptyC title='No Confirmed Orders Found!' />
                )}
            />
            <GorhomBottomSheet sheetRef={orderRef} snapPoints={["78%"]}>
                <OrderDetail selectedOrder={selectedOrder} />
            </GorhomBottomSheet>
            <AcceptOrderModal acceptOrderModal={acceptOrderModal} setAcceptOrderModal={setAcceptOrderModal} />
            <RejectOrderModal rejectOrderModal={rejectOrderModal} setRejectOrderModal={setRejectOrderModal} rejectOrder={rejectOrder} />
        </View>
    )
}

export default ConfirmedOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})