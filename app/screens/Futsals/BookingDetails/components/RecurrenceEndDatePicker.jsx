import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';

import { COLORS, SIZES2 } from '../../../../theme/globalStyle'
import { useSelector } from 'react-redux';

const RecurrenceEndDatePicker = ({ selectedDate = "", setSelectedDate = () => { } }) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const matchDateStart = useSelector(state => state?.homeSlice?.bookingData?.matchDateStart)


    // date
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        // setShow(false);
        setSelectedDate(currentDate);
        Platform.OS == 'android' ?
            setShow(false) : null
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const selectedDateString = selectedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long', // 'short' for abbreviated month names (e.g., 'Jan'), 'numeric' for numbers
        day: 'numeric'
    })

    useEffect(() => {
        Platform.OS == 'ios' && setShow(true)
    }, [])

    return (
        <TouchableOpacity style={styles.rightContent} onPress={showDatepicker}>
            <View style={[styles.locationWrapper]}>
                <AntDesign name='calendar' size={18} color="purple" />
            </View>
            <View style={styles.dateTitleWrapper}>
                <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", marginLeft: 10 }]}>DATE</Text>
                {
                    Platform.OS == 'android' &&
                    <View style={{ padding: 7, backgroundColor: "rgba(239, 207, 227, .3)", borderRadius: 5 }}>
                        <Text style={[SIZES2.text_sm]}>{selectedDateString}</Text>
                    </View>
                }
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        minimumDate={new Date(matchDateStart)}
                        timeZoneName={'Africa/Djibouti'}
                    />
                )
                }
            </View>
        </TouchableOpacity>
    )
}

export default RecurrenceEndDatePicker

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bg_primary,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 50,
        borderColor: COLORS.gray_color
    },
    verticalBar: {
        width: 1,
        height: 50,
        backgroundColor: COLORS.gray_color,
        marginHorizontal: 15
    },
    leftContent: {
        flex: .8,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8
    },
    rightContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: 8
    },
    locationWrapper: {
        backgroundColor: "#f5edff",
        padding: 5,
        borderRadius: 50
    },
    dateTitleWrapper: {
        alignItems: "flex-start",
        rowGap: 2
    }
})