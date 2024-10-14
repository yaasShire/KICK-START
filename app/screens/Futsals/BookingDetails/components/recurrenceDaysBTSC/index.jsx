import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Container, ListHeader } from '../../../../../components'
import { daysOfTheWeek } from '../../../../../data'
import DaysCard from '../DaysCard'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import { useSelector } from 'react-redux'

const RecurrenceBTSC = ({ setShowRecurrenceEndDateModal = () => { }, recurrenceBTSCRef }) => {
    // 
    const weekday = ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
    const date = new Date();
    const currentDay = date.getDay() == 6 ? "Saturday" : weekday[date.getDay() + 1];
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const selectedRecurrenceDays = useSelector(state => state?.homeSlice?.bookingData?.recurrenceDays)

    console.log('====================================');
    console.log("select days-->", selectedRecurrenceDays);
    console.log('====================================');
    // 
    return (
        <View styles={styles.Container}>
            <View style={styles.titleWrapper}>
                <Text style={[SIZES2.text_md]}>Choose Recurrence Match Day(s)</Text>
            </View>
            {/* Days of the week */}
            <FlatList
                numColumns={2}
                data={daysOfTheWeek}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.daysOfTheWeekCon}
                renderItem={({ item }) => <DaysCard data={item} {...item} selectedDay={selectedDay} onSelectCard={() => setSelectedDay(item.day)} />}
            // ListHeaderComponent={() => <ListHeader title="Selected Day(s)" textButton={selectedDay} />}
            />
            <View style={styles.btnWrapper}>
                <TouchableOpacity
                    disabled={selectedRecurrenceDays?.length == 0}
                    style={[styles.btn, { opacity: selectedRecurrenceDays?.length == 0 ? .5 : 1 }]}
                    onPress={() => {
                        setShowRecurrenceEndDateModal(true)
                        recurrenceBTSCRef?.current?.close()
                    }}
                >
                    <Text style={[SIZES2.text_md, { color: "#FFF", fontFamily: "popins400" }]}>Choose Plan</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RecurrenceBTSC

const styles = StyleSheet.create({
    Container: {
        height: "100%",
    },
    daysOfTheWeekCon: {
        rowGap: 10,
        justifyContent: 'center',
        padding: LAY_OUT.padding,
        backgroundColor: "#fff",

    },
    titleWrapper: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#fff",
    },
    btnWrapper: {
        padding: LAY_OUT.padding,
        backgroundColor: "#fff",
    },
    btn: {
        backgroundColor: COLORS.primary_color,
        height: 43,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 450
    }
})