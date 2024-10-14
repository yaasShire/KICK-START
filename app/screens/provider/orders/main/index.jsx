import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import VenueHeader from '../../venues/components/header'
import OrderCard from '../../../provider/components/orderCard'
import { LAY_OUT } from '../../../../theme/globalStyle'
import GorhomBottomSheet from '../../../../components/GorhomBottomSheet'
import OrderDetail from '../../components/oderDetail'
import AcceptOrderModal from '../../components/acceptOrderModal'
import RejectOrderModal from '../../components/rejectOrderModal'
import OrdersTopTabs from '../components/ordersTopTabs'

const OrdersMain = () => {
    const orderRef = useRef()
    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const [rejectOrderModal, setRejectOrderModal] = useState(false)
    const onOrderCardLick = () => {
        // navigate("OrderDetail")
        // alert("h")
        orderRef.current?.expand()
    }
    return (
        <View style={styles.container}>
            <VenueHeader title='Orders' showSearchIcon={false} />
            <OrdersTopTabs />
        </View>
    )
}

export default OrdersMain

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})