//
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TimeSlotCard from './components/TimeSlotCard';
import { DaysCard, SelectedGroundCard } from './components';
import { appLayout, COLORS, SIZES2 } from '../../../theme/globalStyle';
import { nearByFutsalsData, daysOfTheWeek, TimeSlot } from '../../../data';
import futsalLogo from '../../../../assets/images/Futsals/futsalLogo3.png';
import { CustomBtn, Devider, ListHeader, SubHeader } from '../../../components';
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import useFechtDataWithOutToken from '../../../api/getData';
import PickDate from './components/pickDate';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import timeSlotNotFoundImage from '../../../../assets/images/Futsals/timeSlot.png'
import notFoundFutsalImage from '../../../../assets/images/Futsals/notFound.png'
import { get } from '../../../api/get';
import { authorizedGet } from '../../../api/authorizedGet'
import { useDispatch, useSelector } from 'react-redux';
import { addBookingCourtId, addBookingDate, addBookingRecurrenceDay, addBookingTimeSlotId, addBookingTotalPrice, addCalculatedBookingPrice, addMatchDate, addMatchDateStart } from '../../../redux/homeSlice';
import PaymentModal from './components/PaymentModal';
import PaymentVerificationModal from './components/PaymentVerificationModal';
import BookingSuccessModal from './components/BookingSuccessModal';
import { authorizedProviderPost } from '../../../api/authorizedProviderPost';
import authorizedPostAuthentication, { authorizedPost } from '../../../api/authorizedPost';
import { useFocusEffect } from '@react-navigation/native';
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea';
import GorhomBottomSheet from '../../../components/GorhomBottomSheet';
import BookingTypeBTSC from './components/bookingTyeBTSC/BookingTypeBTSC'
import RecurrenceEndDateModal from './components/RecurrenceEndDateModal';
import RecurrenceBTSC from './components/recurrenceDaysBTSC';
import { Snackbar } from 'react-native-paper';
//
const { width, height } = Dimensions.get('window');
//
const weekday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const BookingDetailsScreen = ({ route }) => {
    const bookingTimeSlotId = useSelector(state => state?.homeSlice?.bookingData?.timeSlotId)
    const bookingCourtId = useSelector(state => state?.homeSlice?.bookingData?.courtId)
    const matchDate = useSelector(state => state?.homeSlice?.bookingData?.matchDate)
    const bookingTotalPrice = useSelector(state => state?.homeSlice?.bookingData?.totalPrice)
    const bookingType = useSelector(state => state?.homeSlice?.bookingData?.bookingType)
    const bookingRecurrenceDay = useSelector(state => state?.homeSlice?.bookingData?.recurrenceDay)
    const bookingRecurrenceEndDate = useSelector(state => state?.homeSlice?.bookingData?.recurrenceEndDate)
    const matchDateStart = useSelector(state => state?.homeSlice?.bookingData?.matchDateStart)
    //
    const { id, courtName, venueId, distance, venueCity, venueAddress } = route.params;
    const date = new Date();
    const currentDay = date.getDay() == 6 ? "Saturday" : weekday[date.getDay() + 1];
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [selectFutsal, setSelectFutsal] = useState(courtName);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(bookingTimeSlotId ? bookingTimeSlotId?.startTime + " - " + bookingTimeSlotId?.endTime : 'empty');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error, setError] = useState(false)
    const [error2, setError2] = useState(false)
    const [timeSlots, setTimeSlots] = useState([])
    const [courts, setCourts] = useState([])
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showPaymentVerificationModal, setShowPaymentVerificationModal] = useState(false)
    const [showbookingSuccessModal, setShowBookingSuccessModal] = useState(false)
    const [selectedCourtId, setSelectedCourtId] = useState(id)
    const [showRecurrenceEndDateModal, setShowRecurrenceEndDateModal] = useState(false)
    const [bookingSuccesfulMessage, setBookingSuccesfulMessage] = useState("")
    const [calculatedTotalBookingPrice, setCalculatedTotalBookingPrice] = useState({})
    const selectedRecurrenceDays = useSelector(state => state?.homeSlice?.bookingData?.recurrenceDays)
    const bookingTypeRef = useRef()
    const recurrenceBTSCRef = useRef()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const getTimeSlots = async () => {
        setLoading2(true)
        console.log(`timeslot/getTimeSlotByCourtId/${id}`);
        const { result } = await authorizedGet(`timeslot/getTimeSlotByCourtId/${selectedCourtId}`, setError2, setLoading2)
        console.log(result);
        console.log("time slots--->" + result);
        setTimeSlots(result)
    }

    const getVenueCourts = async () => {
        setLoading()
        const { result } = await authorizedGet(`court/getCourtsByVenueId/${venueId}`, setError, setLoading)
        // setTimeSlots(result)
        setCourts(result)
    }


    const selectedFormattedDate = selectedDate.getFullYear().toString() + "-" + (selectedDate.getMonth() + 1).toString().padStart(2, '0') + "-" + selectedDate.getDate().toString().padStart(2, '0')

    const onBookVenue = async () => {
        try {
            setLoading(true)
            const data = {
                courtId: bookingCourtId,
                timeSlotId: bookingTimeSlotId?.id,
                matchDate: matchDate,
                totalPrice: bookingTotalPrice,
                bookingType,
                recurrenceDays: selectedRecurrenceDays,
                // recurrenceFrequency: 1,
                recurrenceEndDate: bookingRecurrenceEndDate,
                // recurrenceDay: bookingRecurrenceDay,
                // duration: 1,
                isRecurring: bookingType == "ONE_TIME" ? false : bookingType == "WEEKLY" ? true : bookingType == "MONTHLY" ? true : false
            }
            console.log('====================================');
            console.log("Book data request-->", data);
            console.log('====================================');

            const { result } = await authorizedPost("booking/book", setError, setLoading, JSON.stringify(data))
            console.log(result, data);
            if (result?.status == "CREATED") {
                dispatch(addBookingTotalPrice(0))
                dispatch(addBookingCourtId(""))
                dispatch(addBookingTimeSlotId(""))
                dispatch(addMatchDate(""))
                setShowPaymentVerificationModal(false)
                setShowBookingSuccessModal(true)
                setBookingSuccesfulMessage(result?.message)
                getTimeSlots()
            }
            if (result?.status == "BAD_REQUEST") {
                setVisible(true)
                setError(result)
                setShowPaymentVerificationModal(false)
            }

        } catch (error) {
            console.log(error);
        }
    }
    const calculateBookingPrice = async () => {
        // console.log('====================================');
        // console.log("booking total price bb--->", bookingTotalPrice);
        // console.log('====================================');
        try {
            setLoading(true)
            const data = {
                courtId: bookingCourtId,
                timeSlotId: bookingTimeSlotId?.id,
                matchDate: matchDate,
                totalPrice: bookingTotalPrice,
                bookingType,
                recurrenceDays: selectedRecurrenceDays,
                recurrenceEndDate: bookingRecurrenceEndDate,
                isRecurring: bookingType == "ONE_TIME" ? false : bookingType == "WEEKLY" ? true : bookingType == "MONTHLY" ? true : false
            }
            // console.log('====================================');
            // console.log("calculated price--->", data);
            // console.log('====================================');

            const { result } = await authorizedPost("booking/calculate", setError, setLoading, JSON.stringify(data))
            setCalculatedTotalBookingPrice(result)
            dispatch(addCalculatedBookingPrice(result))
            console.log('====================================');
            console.log("booking price-->", result);
            console.log('====================================');
            if (result?.status == "BAD_REQUEST") {
                setVisible(true)
                setError(result)
            }
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // const selectedDayName = days[selectedDate.getDay()];
        // console.log(selectedDayName);  // This will give the name of the day
        dispatch(addMatchDate(selectedFormattedDate))
        // dispatch(addBookingRecurrenceDay(selectedDayName?.toUpperCase()))

    }, [selectedDate])
    useFocusEffect(
        useCallback(() => {
            getTimeSlots()
            getVenueCourts()
        }, [selectedDate, selectedCourtId])
    )

    const openBookingTypeBTS = () => {
        bookingTypeRef?.current?.expand()
    }


    console.log('====================================');
    console.log(selectedDate, matchDateStart);
    console.log('====================================');

    // 
    return (
        <View style={[styles.mainContainer]}>
            <IosAndroidSafeArea />
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Head */}
                <View style={styles.head}>
                    <SubHeader showNotification={false} title="Book a ground" backBtnColor='#000' titleColor='#000' notIconColor='#000' />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <View>
                        <Devider />
                        {/* Futsal Grounds Card */}
                        <ListHeader title="Select Ground" textButton={selectFutsal} numberOfCourts={courts?.length} />
                        <Devider height={15} />
                        {
                            !loading ?
                                <FlatList
                                    horizontal
                                    data={courts}
                                    keyExtractor={(item) => item.id}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.courtsFlatListCon}
                                    renderItem={({ item }) => <SelectedGroundCard {...item} data={item} selectFutsal={selectFutsal} onSelectCard={() => {
                                        dispatch(addMatchDate(item?.id))
                                        setSelectFutsal(item?.name)
                                        setSelectedCourtId(item?.id)
                                    }} />}
                                    ListEmptyComponent={() => (
                                        <View style={{ justifyContent: "center", alignItems: "center", rowGap: 10 }}>
                                            <Image source={notFoundFutsalImage} style={{ width: 60, height: 60, resizeMode: "cover" }} />
                                            <Text style={[SIZES2.text_sm, { opacity: .7 }]}>Not Venue Found</Text>
                                        </View>
                                    )}
                                />
                                :
                                <View>
                                    <ActivityIndicator size={'small'} color={COLORS.primary_color} />
                                </View>
                        }
                        <Devider height={25} />
                        {/* Days of the week */}
                        {/* <FlatList
                            numColumns={2}
                            data={daysOfTheWeek}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.daysOfTheWeekCon}
                            renderItem={({ item }) => <DaysCard {...item} selectedDay={selectedDay} onSelectCard={() => setSelectedDay(item.day)} />}
                            ListHeaderComponent={() => <ListHeader title="Select Day" textButton={selectedDay} />}
                        /> */}
                        <PickDate title='Match Date' venueAddress={venueAddress} venueCity={venueCity} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <Devider height={25} />
                        {/* Days of the week */}
                        {
                            !loading2 ?
                                <FlatList
                                    numColumns={2}
                                    data={timeSlots}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.daysOfTheWeekCon}
                                    renderItem={({ item }) => <TimeSlotCard {...item} selectedDate={selectedFormattedDate} data={item} selectedTimeSlot={selectedTimeSlot} onSelectCard={() => {
                                        dispatch(addBookingTimeSlotId(item))
                                        console.log(item);
                                        dispatch(addBookingTotalPrice(Number(item?.price)))
                                        setSelectedTimeSlot(item?.startTime + " - " + item?.endTime)
                                    }} />}
                                    ListHeaderComponent={() => <ListHeader title={`Select Available Time Slot On ${selectedFormattedDate}`} />}
                                    ListEmptyComponent={() => (
                                        <View style={{ justifyContent: "center", alignItems: "center", rowGap: 10 }}>
                                            <Image source={timeSlotNotFoundImage} style={{ width: 60, height: 60, resizeMode: "cover" }} />
                                            <Text style={[SIZES2.text_sm, { opacity: .7 }]}>Not Time Slot Found!!</Text>
                                        </View>
                                    )}
                                />
                                :
                                <View>
                                    <ActivityIndicator size={'small'} color={COLORS.primary_color} />
                                </View>
                        }
                        <Devider height={25} />
                        {/* Booking Details */}
                        <View style={styles.bookingDetailsCon}>
                            {/* <ListHeader title={`Booking Details`} /> */}
                            <Devider height={15} />
                            <Image
                                resizeMode="cover"
                                source={futsalLogo}
                                style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}
                            />
                            <Devider />
                            <View style={styles.rowCon}>
                                <View style={styles.contentCon}>
                                    <Text style={styles.title}>
                                        Ground Name
                                    </Text>
                                    <Text style={styles.text}>
                                        {selectFutsal}
                                    </Text>
                                </View>
                                <View style={styles.contentCon}>
                                    <Text style={styles.title}>
                                        Date
                                    </Text>
                                    <Text style={styles.text}>
                                        {selectedFormattedDate}
                                    </Text>
                                </View>
                                <View style={styles.contentCon}>
                                    <Text style={styles.title}>
                                        Time Slot
                                    </Text>
                                    <Text style={styles.text}>
                                        {selectedTimeSlot}
                                    </Text>
                                </View>
                            </View>
                            <Devider height={25} />
                            <CustomBtn title="Book Now" disableBtn={(bookingTimeSlotId || selectedTimeSlot != 'empty') ? false : true} onClickHandler={() => {
                                openBookingTypeBTS()
                            }} />
                            <Devider height={5} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <GorhomBottomSheet sheetRef={bookingTypeRef} snapPoints={["43%"]}>
                <BookingTypeBTSC calculateBookingPrice={calculateBookingPrice} setShowPaymentModal={setShowPaymentModal} bookingTypeRef={bookingTypeRef} recurrenceBTSCRef={recurrenceBTSCRef} setShowRecurrenceEndDateModal={setShowRecurrenceEndDateModal} />
            </GorhomBottomSheet>
            <GorhomBottomSheet sheetRef={recurrenceBTSCRef} snapPoints={["55%"]}>
                <RecurrenceBTSC setShowPaymentModal={setShowPaymentModal} recurrenceBTSCRef={recurrenceBTSCRef} setShowRecurrenceEndDateModal={setShowRecurrenceEndDateModal} />
            </GorhomBottomSheet>
            <PaymentModal calculateBookingPrice={calculateBookingPrice} showPaymentModal={showPaymentModal} setShowPaymentVerificationModal={setShowPaymentVerificationModal} setShowPaymentModal={setShowPaymentModal} />
            <PaymentVerificationModal calculatedTotalBookingPrice={calculatedTotalBookingPrice} bookingTotalPrice={bookingTotalPrice} loading={loading} onBookVenue={onBookVenue} setShowBookingSuccessModal={setShowBookingSuccessModal} showPaymentVerificationModal={showPaymentVerificationModal} setShowPaymentVerificationModal={setShowPaymentVerificationModal} />
            <BookingSuccessModal bookingSuccesfulMessage={bookingSuccesfulMessage} showbookingSuccessModal={showbookingSuccessModal} setShowBookingSuccessModal={setShowBookingSuccessModal} />
            <RecurrenceEndDateModal calculateBookingPrice={calculateBookingPrice} setShowPaymentModal={setShowPaymentModal} showRecurrenceEndDateModal={showRecurrenceEndDateModal} setShowRecurrenceEndDateModal={setShowRecurrenceEndDateModal} />
            {/* <View style={{ width: "100%" }}>

            </View> */}
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Verification Failed',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {error?.message}
            </Snackbar>
        </View>
    )
}
//
export default BookingDetailsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: appLayout.padding,
        // backgroundColor: COLORS.primary_color
    },
    body: {
        flex: 1,
        zIndex: 1000,
        padding: '3%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary
    },
    courtsFlatListCon: {
        columnGap: 15
    },
    daysOfTheWeekCon: {
        rowGap: 20,
        justifyContent: 'center',
    },
    bookingDetailsCon: {
        padding: '3%',
        borderWidth: 0.8,
        borderRadius: 5,
        borderColor: COLORS.gray_color
    },
    rowCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentCon: {
        alignItems: 'center',
        rowGap: 5,
        justifyContent: 'center'
    },
    title: {
        ...SIZES2.text_sm,
        color: COLORS.black800
    },
    text: {
        ...SIZES2.text_sm,
        letterSpacing: 0.5,
        color: COLORS.black900
    }
})
//