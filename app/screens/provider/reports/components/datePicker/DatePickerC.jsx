import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo, Feather, AntDesign } from 'react-native-vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle';
const DatePickerC = ({ title = "", selectedDate = "", setSelectedDate = () => { }, error = false }) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

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
        <View style={[styles.container(error)]}>
            <View style={styles.datePickerWrapper}>
                <Text style={[SIZES2.text_sm]}>{title}</Text>
                <TouchableOpacity style={styles.contentWrapper} onPress={showDatepicker}>
                    <View style={[styles.locationWrapper]}>
                        <AntDesign name='calendar' size={18} color="purple" />
                    </View>
                    <View style={styles.pickerContainer}>
                        {
                            Platform.OS == 'android' &&
                            <View style={{ padding: 7, backgroundColor: "rgba(239, 207, 227, .3)", borderRadius: 5 }}>
                                <Text style={[SIZES2.text_sm]}>{selectedDateString}</Text>
                            </View>
                        }
                        {
                            show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={selectedDate}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChange}
                                    // minimumDate={new Date()}
                                    timeZoneName={'Africa/Djibouti'}
                                    style={{ width: "100%" }}
                                />
                            )
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DatePickerC

// styles

const styles = StyleSheet.create({
    container: (error = false) => ({
        // borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 50,
        borderColor: COLORS.gray_color,
        maxWidth: 155,
        height: 60
    }),
    datePickerWrapper: {
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 4
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
        columnGap: 5
    },
    contentWrapper: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 3,
        width: "100%"
    },
    locationWrapper: {
        backgroundColor: "#f5edff",
        // padding: 5,
        borderRadius: 50
    },
    dateTitleWrapper: {
        alignItems: "flex-start",
        rowGap: 2
    },
    pickerContainer: {
        // backgroundColor: '#f0f0f0',  // background color for the picker container
        // padding: 10,                 // padding around the picker
        borderRadius: 10,            // rounded corners
        alignItems: 'center',
        // width: 75,
    }
})