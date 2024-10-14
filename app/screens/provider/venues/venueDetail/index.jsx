import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import VenueImageCarousel from '../components/venueImageCarousel'
import { COLORS, LAY_OUT, SIZES2, screenHeight } from '../../../../theme/globalStyle'
import { Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, FontAwesome, Octicons } from '@expo/vector-icons'
import TimeSlotCardVenue from '../components/timeSlotCardVenue'
import CourtCardVenue from '../components/courtCardVenue'
import GorhomBottomSheet from '../../../../components/GorhomBottomSheet'
import CourtDetail from '../components/courtDetail'
import CourtRegistration from '../components/courtRegistration'
import TimeSlotRegistration from '../components/timeSlotRegistration'
import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import EmptyC from '../../../provider/components/emptyC'
import ConfirmationModal from '../../components/confirmationModal'
import { authorizedProviderDelete } from '../../../../api/authorizedProviderDelete'
import { authorizedProviderUpdate } from '../../../../api/authorizedProviderUpdate'
import { useDispatch } from 'react-redux'
import { addBasicCourtData, addCourtDimensions } from '../../../../redux/venue'
import IosAndroidSafeArea from '../../../../components/iosAndroidSafeArea'
import VenueIncomeActionsList from '../components/VenueIncomeActionsList'

//
const VenueDetail = ({ route }) => {
    const { navigate, goBack } = useNavigation()
    const courtDetailRef = useRef()
    const courtRegistrationRef = useRef()
    const timeSlotRegistrationRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [venue, setVenue] = useState({})
    const [venueRating, setVenueRating] = useState(0)
    const [courts, setCourts] = useState([])
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [court, setCourt] = useState(null)
    const [updateCourt, setUpdateCourt] = useState(false)
    const [selectedCourt, setSelectedCourt] = useState({})
    const [timeSlots, setTimeSlots] = useState([])
    const [timeSlotLoading, setTimeSlotLoading] = useState(false)
    const [timeSlotUpdateCurrentValues, setTimeSlotUpdateCurrentValues] = useState({})
    const [updateTimeSlot, setUpdateTimeSlot] = useState(false)
    const [incomeReportType, setIncomeReportType] = useState("monthly")
    const [venueIncome, setVenueIncome] = useState(0)
    const [confirmationTexts, setConfirmationTexts] = useState({
        title: "",
        description: "",
        label: ""
    })
    const dispatch = useDispatch()

    const onCartView = (item = {}) => {
        setSelectedCourt(item)
        getCourtTimeSlots()
        courtDetailRef?.current?.expand()
    }

    const getVenueIncome = async () => {
        try {
            const url = (incomeReportType && incomeReportType != 'total')
                ? `booking/getTotalVenueIncome/${route?.params?.id}?period=${incomeReportType}`
                : `booking/getTotalVenueIncome/${route?.params?.id}`;
            const { result } = await authorizeProviderGet(url, setError, setLoading)
            console.log(result);

            if (result?.status === "OK") {
                setVenueIncome(result?.data)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const getSingleVenueDetail = async () => {
        try {
            const { result } = await authorizeProviderGet(`venue/getSingleVenue/${route?.params?.id}`, setError, setLoading)
            setVenue(result)
        } catch (error) {
            console.log(error);
        }
    }
    const getSingleVenueRating = async () => {
        try {
            const { result } = await authorizeProviderGet(`ratings/venue/${route?.params?.id}/average`, setError2, setLoading2)
            setVenueRating(result?.rating)
        } catch (error) {
            console.log(error);
        }
    }

    const getVenueCourts = async () => {
        try {
            setLoading3(true)
            const { result } = await authorizeProviderGet(`court/getCourtsByVenueId/${route?.params?.id}`, setError3, setLoading3)
            setCourts(result)
        } catch (error) {
            console.log(error);
        }

    }

    const getCourtTimeSlots = async (id) => {
        try {
            if (id) {
                setTimeSlots([])
                setTimeSlotLoading(true)
                console.log(selectedCourt);
                // console.log("court id-->" + courtId);
                // console.log("data" + item);
                const { result } = await authorizeProviderGet(`timeslot/getTimeSlotByCourtId/${id}`, setError, setTimeSlotLoading)
                console.log('====================================');
                console.log(result);
                console.log('====================================');
                if (!result) {
                    setTimeSlots([])
                } else {
                    setTimeSlots(result)
                }
            } else {
                console.log(id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleVenueDetail()
        getSingleVenueRating()
        getVenueCourts()
    }, [])

    useEffect(() => {
        getVenueIncome()
    }, [incomeReportType])

    const deleteVenueCourt = async () => {
        try {
            console.log("courtId", court?.id);
            const { result } = await authorizedProviderDelete(`court/delete/${court?.id}`, setError, setLoading)
            if (result?.message == "Court Deleted Successfully") {
                getVenueCourts()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const updateVenueCourt = async () => {
        try {
            dispatch(addBasicCourtData({
                name: court?.name,
                activePlayersPerTeam: court?.activePlayersPerTeam,
                surface: court?.surface,
                basePrice: court?.basePrice
            }))

            dispatch(addCourtDimensions({
                width: court?.width,
                height: court?.height,
                additionalInfo: court?.additionalInfo,
            }))
            setUpdateCourt(true)
            courtRegistrationRef?.current?.expand()
            // const { result } = await authorizedProviderUpdate(`court/update/${courtId}`, setError, setLoading)
            // console.log("result-->", result);
        } catch (error) {
            console.log(error);
        }
    }

    //
    return (
        <View style={styles.container}>
            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.carouselWrapper}>
                    <VenueImageCarousel images={venue?.images} />
                    <View style={styles.btnBack}>
                        <Appbar.BackAction size={17} iconColor={"#000"} onPress={() => {
                            goBack()
                        }}
                            style={{ backgroundColor: COLORS.bg_tertiary }}
                        >
                        </Appbar.BackAction>
                    </View>
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.row1}>
                        <View style={styles.row1SubWholeWrapper}>
                            <View style={styles.row1subWrapper}>
                                <View style={styles.nameicon}>
                                    <Text style={[SIZES2.text_base]}>{venue?.name}</Text>
                                    <AntDesign name='checkcircle' size={14} />
                                </View>
                                <View style={styles.ratingWrapper}>
                                    <FontAwesome name='star' size={15} color={"#f7b502"} />
                                    <Text style={[SIZES2.text_sm]}>{venueRating ? venueRating : 0.0}</Text>
                                </View>
                            </View>
                            <View style={styles.row1lineTwo}>
                                <Text style={[SIZES2.text_sm, { color: "rgba(0, 0, 0, .7)" }]}>{venue?.address}/ {venue?.city}</Text>
                                <View style={styles.phoneNumberWrapper}>
                                    <FontAwesome name='phone-square' size={15} />
                                    <Text style={[SIZES2.text_sm]}>{venue?.phoneNumber}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.descriptionWrapper}>
                            <Text style={[SIZES2.text_md]}>Descriptions</Text>
                            <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", color: "rgba(0, 0, 0, .6)" }]}>{venue?.description}</Text>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <Text style={[SIZES2.text_md]}>Schedule</Text>
                        <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", color: "rgba(0, 0, 0, .8)" }]}>This venue is open {venue?.numberOfHoursOpen} Hours a day</Text>
                        <View style={styles.scheduleTimeWrapper}>
                            <View style={styles.schedulesItemLeft}>
                                <Octicons name='stopwatch' color={"#fff"} size={17} />
                                <View style={styles.schedulesItem}>
                                    <Text style={[SIZES2.text_sm, { color: "#fff" }]}>Opens</Text>
                                    <Text style={[SIZES2.text_sm, { color: "#fff" }]}>{venue?.openTime}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalLine} />
                            <View style={styles.schedulesItem}>
                                <Text style={[SIZES2.text_sm, { color: "#fff" }]}>CLoses</Text>
                                <Text style={[SIZES2.text_sm, { color: "#fff" }]}>{venue?.closeTime}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.venueIncom}>
                        <View style={{

                        }}>
                            <View style={{
                                flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: LAY_OUT.padding,
                                paddingVertical: 5
                            }}>
                                <Text style={[SIZES2.text_base]}>Select Period</Text>
                                <VenueIncomeActionsList incomeReportType={incomeReportType} setIncomeReportType={setIncomeReportType} />
                            </View>
                            <Divider />
                        </View>
                        <View style={styles.incomeWrapper}>
                            <Text style={[SIZES2.text_md]}>Venue Income</Text>
                            <Text style={[SIZES2.text_base]}>${venueIncome}</Text>
                        </View>
                    </View>
                    <View style={styles.row3}>
                        <View style={styles.titleAddButtonWrapper}>
                            <Text style={[SIZES2.text_md]}>Courts</Text>
                            <TouchableOpacity onPress={() => courtRegistrationRef?.current?.expand()}>
                                <AntDesign name='pluscircle' size={30} color={"#000"} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            scrollEnabled={false}
                            data={courts}
                            contentContainerStyle={{ rowGap: 12 }}
                            renderItem={({ item }) => (
                                <CourtCardVenue setCourt={setCourt} data={item} onPress={() => {
                                    console.log(item);
                                    getCourtTimeSlots(item?.id)
                                    onCartView(item)
                                    setSelectedCourt(item)
                                    // alert(item?.id)
                                }} setShowConfirmationModal={setShowConfirmationModal} setConfirmationTexts={setConfirmationTexts} />
                            )}
                            ListEmptyComponent={() => <EmptyC title='No Court Found' />}
                        />
                    </View>
                </View>
            </ScrollView>
            {
                // !timeSlotLoading &&
                <GorhomBottomSheet sheetRef={courtDetailRef} snapPoints={["65%"]}>
                    <CourtDetail setUpdateTimeSlot={setUpdateTimeSlot} setTimeSlotUpdateCurrentValues={setTimeSlotUpdateCurrentValues} onRefresh={() => {
                        getCourtTimeSlots(selectedCourt?.id)
                    }} timeSlots={timeSlots || []} timeSlotLoading={timeSlotLoading} selectedCourt={selectedCourt} timeSlotRegistrationRef={timeSlotRegistrationRef} courtDetailRef={courtDetailRef} />
                </GorhomBottomSheet>
            }
            <GorhomBottomSheet sheetRef={courtRegistrationRef} snapPoints={["90%"]}>
                <CourtRegistration courtId={court?.id} updateCourt={updateCourt} courtRegistrationRef={courtRegistrationRef} venueId={route?.params?.id} getVenueCourts={getVenueCourts} />
            </GorhomBottomSheet>
            <GorhomBottomSheet sheetRef={timeSlotRegistrationRef} snapPoints={["72%"]}>
                <TimeSlotRegistration updateTimeSlot={updateTimeSlot} timeSlotUpdateCurrentValues={timeSlotUpdateCurrentValues} onRefresh={() => {
                    getCourtTimeSlots(selectedCourt?.id)
                }} courtId={selectedCourt?.id} timeSlotRegistrationRef={timeSlotRegistrationRef} />
            </GorhomBottomSheet>
            <ConfirmationModal updateVenue={updateVenueCourt} deleteVenue={deleteVenueCourt} showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal} confirmationTexts={confirmationTexts} />
        </View>
    )
}

export default VenueDetail

const styles = StyleSheet.create({
    incomeWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: LAY_OUT.padding,
        paddingVertical: 5
    },
    venueIncom: {
        backgroundColor: "#fff",
        borderRadius: 10,
        rowGap: 13,
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    carouselWrapper: {
        height: screenHeight / 2.5
    },
    contentWrapper: {
        zIndex: 100,
        backgroundColor: "#fff",
        padding: LAY_OUT.padding,
        rowGap: 20
    },
    descriptionWrapper: {
        rowGap: 5
    },
    btnBack: {
        position: "absolute",
        top: Platform.OS == 'android' ? 30 : 30
    },
    row1: {
        rowGap: 10
    },
    nameicon: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: 8
    },
    row1subWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    phoneNumberWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 3
    },
    ratingWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 3,
    },
    row2: {
        rowGap: 5
    },
    row1SubWholeWrapper: {
        rowGap: 3
    },
    row1lineTwo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    scheduleTimeWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000",
        height: 40,
        borderRadius: 3,
        paddingHorizontal: LAY_OUT.paddingX
    },
    schedulesItem: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    },
    schedulesItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10
    },
    verticalLine: {
        width: 1,
        height: 20,
        backgroundColor: "#fff"
    },
    courtsWrapper: {
        rowGap: 10
    },
    row3: {
        rowGap: 20
    },
    titleAddButtonWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

})