import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo, Feather, AntDesign } from 'react-native-vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle';
const PickTimeCalendar = ({ title = "", selectedDate = "", setSelectedDate = () => { }, setTime = () => { }, time = "" }) => {
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    // date
    const onChange = (event, time) => {
        const currentDate = time;
        // setShow(false);
        setTime(currentDate);
        Platform.OS == 'android' ?
            setShow(false) : null
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('time');
    };

    const timeString = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true // Use 'true' for 12-hour format with AM/PM
    });

    useEffect(() => {
        Platform.OS == 'ios' && setShow(true)
    }, [])
    return (
        <View style={[styles.container]}>
            {/* <View style={styles.leftContent}>
                <View style={[styles.locationWrapper]}>
                    <Entypo name='location-pin' size={18} color="purple" />
                </View>
                <View>
                    <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", }]}>{venueAddress}</Text>
                    <Text style={[SIZES2.text_md]}>{venueCity}</Text>
                </View>
            </View> */}
            {/* <View style={styles.verticalBar} /> */}
            <TouchableOpacity style={styles.rightContent} onPress={showDatepicker}>
                <View style={[styles.locationWrapper]}>
                    <AntDesign name='calendar' size={18} color="purple" />
                </View>
                <View style={styles.dateTitleWrapper}>
                    <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", marginLeft: 10 }]}>{title}</Text>
                    {
                        Platform.OS == 'android' &&
                        <View style={{ padding: 7, backgroundColor: "rgba(239, 207, 227, .5)", borderRadius: 5 }}>
                            <Text style={[SIZES2.text_sm]}>{timeString}</Text>
                        </View>
                    }
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time}
                            mode={mode || 'time'}
                            is24Hour={false}
                            onChange={onChange}
                        />
                    )
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default PickTimeCalendar

// styles

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
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})