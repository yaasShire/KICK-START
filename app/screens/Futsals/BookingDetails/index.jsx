//
import React, { useState } from 'react';
import TimeSlotCard from './components/TimeSlotCard';
import { DaysCard, SelectedGroundCard } from './components';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { nearByFutsalsData, daysOfTheWeek, TimeSlot } from '../../../data';
import futsalLogo from '../../../../assets/images/Futsals/futsalLogo3.png';
import { CustomBtn, Devider, ListHeader, SubHeader } from '../../../components';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const { width, height } = Dimensions.get('window');
//
const weekday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const BookingDetailsScreen = ({ route }) => {
    //
    const { id, futsalName } = route.params;
    const date = new Date();
    const currentDay = date.getDay() == 6 ? "Saturday" : weekday[date.getDay() + 1];
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [selectFutsal, setSelectFutsal] = useState(futsalName);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('null');
    ///
    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Head */}
                <View style={styles.head}>
                    <SubHeader title="Book a ground" />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <View>
                        <Devider />
                        {/* Futsal Grounds Card */}
                        <ListHeader title="Select Ground" textButton={selectFutsal} />
                        <Devider height={15} />
                        <FlatList
                            horizontal
                            data={nearByFutsalsData}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.courtsFlatListCon}
                            renderItem={({ item }) => <SelectedGroundCard {...item} selectFutsal={selectFutsal} onSelectCard={() => setSelectFutsal(item.futsalName)} />}
                        />
                        <Devider height={25} />
                        {/* Days of the week */}
                        <FlatList
                            numColumns={2}
                            data={daysOfTheWeek}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.daysOfTheWeekCon}
                            renderItem={({ item }) => <DaysCard {...item} selectedDay={selectedDay} onSelectCard={() => setSelectedDay(item.day)} />}
                            ListHeaderComponent={() => <ListHeader title="Select Day" textButton={selectedDay} />}
                        />
                        <Devider height={25} />
                        {/* Days of the week */}
                        <FlatList
                            numColumns={2}
                            data={TimeSlot}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.daysOfTheWeekCon}
                            renderItem={({ item }) => <TimeSlotCard {...item} selectedTimeSlot={selectedTimeSlot} onSelectCard={() => setSelectedTimeSlot(item.time)} />}
                            ListHeaderComponent={() => <ListHeader title={`Select Available Time Slot On ${selectedDay}`} />}
                        />
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
                                        Day
                                    </Text>
                                    <Text style={styles.text}>
                                        {selectedDay}
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
                            <CustomBtn title="Book Now" />
                            <Devider height={5} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default BookingDetailsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: appLayout.padding,
        backgroundColor: COLORS.primary_color
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
        columnGap: 15,
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
        fontSize: 13,
        fontWeight: '400',
        color: COLORS.black800
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: COLORS.black900
    }
})
//