import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES2 } from '../../../../theme/globalStyle'
import { Entypo, Feather, AntDesign } from 'react-native-vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { textShortner } from '../../../../utilities';
import { useDispatch } from 'react-redux';
import { addMatchDateStart } from '../../../../redux/homeSlice';
const PickDate = ({ venueCity = "", venueAddress = "", selectedDate = "", setSelectedDate = () => { }, error = false, title = "Date Of Birth" }) => {
    //
    const dispatch = useDispatch()
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // date
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        // setShow(false);
        setSelectedDate(currentDate);
        dispatch(addMatchDateStart(currentDate.toISOString())); // Store date as ISO string

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
            <View style={styles.leftContent}>
                <View style={[styles.locationWrapper]}>
                    <Entypo name='location-pin' size={18} color="purple" />
                </View>
                <View>
                    <Text numberOfLines={1} style={[SIZES2.text_sm, { fontFamily: "poppins400", width: "60%" }]}>{venueAddress}</Text>
                    <Text numberOfLines={1} style={[SIZES2.text_md, { width: "100%" }]}>{venueCity}</Text>
                </View>
            </View>
            <View style={styles.verticalBar} />
            <TouchableOpacity style={styles.rightContent} onPress={showDatepicker}>
                <View style={[styles.locationWrapper]}>
                    <AntDesign name='calendar' size={18} color="purple" />
                </View>
                <View style={styles.dateTitleWrapper}>
                    <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", marginLeft: 10 }]}>{title}</Text>
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
                            // minimumDate={new Date()}
                            timeZoneName={'Africa/Djibouti'}
                        />
                    )
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default PickDate

// styles

const styles = StyleSheet.create({
    container: (error = false) => ({
        backgroundColor: error ? "red" : COLORS.bg_primary,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 50,
        borderColor: COLORS.gray_color
    }),
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