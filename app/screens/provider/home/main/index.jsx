import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import HomeHeader from '../components/header'
import InfoCard from '../components/infoCard'
import { Divider } from 'react-native-paper'
import OrderCard from '../../components/orderCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import GorhomBottomSheet from '../../../../components/GorhomBottomSheet'
import OrderDetail from '../../components/oderDetail'
import AcceptOrderModal from '../../components/acceptOrderModal'
import RejectOrderModal from '../../components/rejectOrderModal'
import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authorizedProviderUpdate } from '../../../../api/authorizedProviderUpdate'
import BookingConfirmedSuccessFully from '../../components/bookingActionResponseModal'
import BookingResponseActionModal from '../../components/bookingActionResponseModal'
import noOrderFound from '../../../../../assets/images/Futsals/venue_not_found.png'
import { Image } from 'react-native'
import EmptyC from '../../components/emptyC'
import IosAndroidSafeArea from '../../../../components/iosAndroidSafeArea'

const ProviderHome = () => {
    const { navigate } = useNavigation()
    const orderRef = useRef()
    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const [rejectOrderModal, setRejectOrderModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error2, setError2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [error3, setError3] = useState(false)
    const [loading4, setLoading4] = useState(false)
    const [error4, setError4] = useState(false)
    const [loading5, setLoading5] = useState(false)
    const [error5, setError5] = useState(false)
    const [bookingOrders, setBookingOrders] = useState([])
    const [user, setUser] = useState({})
    const [selectedOrder, setSelectedOrder] = useState({})
    const [bookingResponseActionModal, setBookingResponseActionModal] = useState(false)
    const [numeberOfPendingOrders, setnumeberOfPendingOrders] = useState(0)
    const [numberOfNewOrders, setNumberOfNewOrders] = useState(0)
    const [numberOfVenues, setNumberOfVenues] = useState(0)
    const [numberOfTodayOrders, setNumberOfTodayOrders] = useState(0)
    const [numberOfTodayMatches, setNumberOfTodayMatches] = useState(0)
    const [numberOfPendingOrders, setNumberOfPendingOrders] = useState(0)
    const [isUserSubscribed, setIsUserSubscribed] = useState(false)
    const [totalProviderIncome, settotalProviderIncome] = useState(0)
    const [totalIncomeOfTodayOrders, setTotalIncomeOfTodayOrders] = useState(0)
    const [bookingResponseText, setBookingResponseText] = useState({
        title: "",
        description: ""
    })
    const info = [
        {
            title: "Today Orders",
            ammount: numberOfTodayOrders ? numberOfTodayOrders : 0,
            status: 4,
            bgColor: "#2D2D2D"
        },
        {
            title: "Pending Orders",
            ammount: numberOfPendingOrders ? numberOfPendingOrders : 0,
            status: 8,
            bgColor: "#001F3F"
        },
        {
            title: "Today Matchs",
            ammount: numberOfTodayMatches ? numberOfTodayMatches : 0,
            status: 2,
            bgColor: "#8B0000"
        },
        {
            title: "Number Of Venues",
            ammount: numberOfVenues ? numberOfVenues : 0,
            status: 3,
            bgColor: "#B22222"
        },
        {
            title: "Today Total Income",
            ammount: totalIncomeOfTodayOrders ? totalIncomeOfTodayOrders : 0,
            status: 3,
            bgColor: "#6A5ACD"
        },
        {
            title: "Total Income",
            ammount: totalProviderIncome ? totalProviderIncome : 0,
            status: 3,
            bgColor: "#4169E1"
        },
    ]
    const onOrderCardLick = (item = {}) => {
        setSelectedOrder(item)
        orderRef.current?.expand()
    }

    const getNumberOfTodayOrders = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getNumberOfTodayOrders", setError3, setLoading3)
            setNumberOfTodayOrders(result?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getTotalProviderIncome = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/totalBookingIncomeForProvider", setError3, setLoading3)
            settotalProviderIncome(result?.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getTotalIncomeOfTodayOrders = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getTotalIncomeOfTodayOrders", setError3, setLoading3)
            setTotalIncomeOfTodayOrders(result?.data);
        } catch (error) {
            console.log(error);
        }
    }


    const getNumberOfPendingOrders = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getNumberOfPendingOrders", setError5, setLoading5)
            setNumberOfPendingOrders(result?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getNumberOfTodayMatches = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getNumberOfTodayMatches", setError4, setLoading4)
            setNumberOfTodayMatches(result?.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getNewOrders = async () => {
        try {
            const { result } = await authorizeProviderGet("booking/getTop10NewOrders", setError, setLoading)
            setBookingOrders(result?.data?.orders)
            setnumeberOfPendingOrders(result?.data?.pendingOrdersCount)
            setNumberOfNewOrders(result?.data?.orders?.length)
        } catch (error) {
            console.log(error);
        }
    }

    const getNumberOfVenuesByProvider = async () => {
        try {
            const { result } = await authorizeProviderGet("venue/getNumberOfVenues", setError, setLoading)
            // if (result?.status = "OK") {
            setNumberOfVenues(result?.data)
            // }
        } catch (error) {
            console.log(error);
        }
    }

    const getProfileData = async () => {
        try {
            const { result } = await authorizeProviderGet("authenticate/profileData", setError2, setLoading2)
            if (result?.message == "No User Found") {
                await AsyncStorage.removeItem("isProviderLoggedIn")
                await AsyncStorage.removeItem("providerAccessToken")
                checkLoggedIn()
            }
            setUser(result)
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
                getNewOrders()
                getNumberOfTodayMatches()
            }
            if (result?.message == "The booking has expired and cannot be confirmed") {
                alert(result?.message)
            }
            if (result?.status == "BAD_REQUEST") {
                alert(result?.message)
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
                getNewOrders()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkUserSubscription = async () => {
        try {
            const { result } = await authorizeProviderGet("authenticate/isUserSubscribed", setError, setLoading)
            setIsUserSubscribed(result?.data);
            if (result?.message === "User is Subscribed But Not Approved") {
                navigate("RequestApproval")
            } else if (result?.data == false) {
                navigate("MainSubscription")
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getProfileData()
            getNewOrders()
            getNumberOfVenuesByProvider()
            getNumberOfTodayOrders()
            getNumberOfTodayMatches()
            getNumberOfPendingOrders()
            checkUserSubscription()
            getTotalProviderIncome()
            getTotalIncomeOfTodayOrders()
        }, [])
    )

    return (
        <View style={styles.container}>
            <IosAndroidSafeArea />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.subWrapper}>
                    <HomeHeader user={user} />
                    <View style={styles.infoCardsHolder}>
                        <InfoCard data={info[0]} />
                        <InfoCard data={info[1]} />
                        <InfoCard data={info[2]} />
                        <InfoCard data={info[3]} />
                        <InfoCard data={info[4]} />
                        <InfoCard data={info[5]} />
                    </View>
                    <View style={styles.ordersWholeWrapper}>
                        {/* <View style={styles.totalVenueIncome}>
                            <Text style={[SIZES2.text_md]}>Total Income Of Today Orders</Text>
                            <Text style={[SIZES2.text_base]}>${totalIncomeOfTodayOrders}</Text>
                        </View> */}
                        {/* <Divider />
                        <View style={styles.totalVenueIncome}>
                            <Text style={[SIZES2.text_md]}>Total Income</Text>
                            <Text style={[SIZES2.text_base]}>${totalProviderIncome}</Text>
                        </View> */}
                        <Divider />
                        <View style={styles.ordersHeader}>
                            <Text style={[SIZES2.text_md, { color: COLORS.gray_font_color }]}>Recent Orders</Text>
                            {/* <Text style={[SIZES2.text_sm, { color: COLORS.linkColor }]}>View All</Text> */}
                        </View>
                        <Divider />
                        <FlatList
                            scrollEnabled={false}
                            contentContainerStyle={{ rowGap: 10 }}
                            data={bookingOrders}
                            renderItem={({ item }) => (
                                <View>
                                    <OrderCard data={item} showActionsBtns showAcceptOrder showCancelOrder onPress={() => onOrderCardLick(item)} setSelectedOrder={setSelectedOrder} setAcceptOrderModal={setAcceptOrderModal} setRejectOrderModal={setRejectOrderModal} />
                                    <Divider />
                                </View>
                            )}
                            ListEmptyComponent={() => (
                                // <View style={styles.emptyCWrapper}>
                                //     <Image source={noOrderFound} style={styles.notFoundImg} />
                                //     <Text>No Recent Booking Orders Found!</Text>
                                // </View>
                                <EmptyC title='No Recent Booking Orders Found!' />
                            )}
                        />

                    </View>
                </View>
            </ScrollView>
            <GorhomBottomSheet sheetRef={orderRef} snapPoints={["60%"]}>
                <OrderDetail selectedOrder={selectedOrder} />
            </GorhomBottomSheet>
            <AcceptOrderModal acceptOrderModal={acceptOrderModal} setAcceptOrderModal={setAcceptOrderModal} acceptOrder={acceptOrder} />
            <RejectOrderModal rejectOrderModal={rejectOrderModal} setRejectOrderModal={setRejectOrderModal} rejectOrder={rejectOrder} />
            <BookingResponseActionModal bookingResponseActionModal={bookingResponseActionModal} setBookingResponseActionModal={setBookingResponseActionModal} bookingResponseText={bookingResponseText} />
        </View>
    )
}

export default ProviderHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    subWrapper: {
        flex: 1,
        padding: LAY_OUT.padding,
        rowGap: 12
    },
    infoCardsHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 8
    },
    ordersWholeWrapper: {
        backgroundColor: "#fff",
        padding: LAY_OUT.padding,
        borderRadius: 10,
        rowGap: 13,
        borderWidth: 1,
        borderColor: COLORS.bg_secondary
    },
    ordersHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    ordersWrapper: {
        rowGap: 10
    },
    notFoundImg: {
        width: 150,
        height: 150,
        resizeMode: "center"
    },
    emptyCWrapper: {
        alignItems: "center",
        justifyContent: "center"
    },
    totalVenueIncome: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})