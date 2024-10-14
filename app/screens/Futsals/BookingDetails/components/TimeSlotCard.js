import React, { useMemo } from 'react';
import { COLORS, SIZES2 } from '../../../../theme/globalStyle';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TimeSlotCard = ({ id, time, status, price, selectedTimeSlot = '', onSelectCard = () => { }, data = {}, selectedDate = "" }) => {
    const bookedDates = data?.bookedDates ?? [];

    // Function to convert '03:00 PM' format to a Date object
    const convertTo24Hour = (timeString) => {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return new Date(selectedDate).setHours(hours, minutes);
    };

    const startTime = useMemo(() => convertTo24Hour(data?.startTime), [data?.startTime]);
    const endTime = useMemo(() => convertTo24Hour(data?.endTime), [data?.endTime]);

    // Get current time for comparison
    const currentTime = new Date().getTime();

    const isTimeExpired = useMemo(() => {
        return currentTime > endTime;
    }, [currentTime, endTime]);

    const isBooked = useMemo(() => {
        return bookedDates.includes(selectedDate) || isTimeExpired;
    }, [selectedTimeSlot, isTimeExpired]);

    const isSelectedTimeSlot = useMemo(() => {
        return selectedTimeSlot == data?.startTime + " - " + data?.endTime;
    }, [selectedTimeSlot]);

    const Status = () => {
    };



    return (
        <Pressable onPress={isBooked ? Status : onSelectCard} style={[styles.container, { borderColor: (isSelectedTimeSlot && !isBooked) ? COLORS.primary_color : COLORS.gray_color }]}>
            <MaterialCommunityIcons
                size={23}
                style={styles.checkBoxIcon}
                color={isBooked ? COLORS.gray_color : COLORS.primary_color}
                name={isBooked ? "checkbox-blank-off-outline" : isSelectedTimeSlot ? "checkbox-marked-outline" : "checkbox-blank-outline"}
            />
            <Text style={[styles.status, { color: isBooked ? "red" : COLORS.primary_color }]}>
                {status} {isBooked ? 'unAvailable' : 'available'}
            </Text>
            <View style={{ rowGap: 10, marginTop: 7 }}>
                <Text style={[styles.priceTxt, { color: isBooked ? COLORS.black700 : COLORS.tertiary_color, textAlign: "center" }]}>
                    ${price}
                </Text>
                <Text style={[styles.dayTxt, { color: isBooked ? COLORS.black700 : COLORS.black900 }]}>
                    {data?.startTime} - {data?.endTime}
                </Text>
            </View>
        </Pressable>
    )
}

export default TimeSlotCard;

const styles = StyleSheet.create({
    container: {
        width: '47%',
        padding: '4%',
        columnGap: 10,
        borderRadius: 4,
        marginRight: '6%',
        borderWidth: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    dayTxt: {
        ...SIZES2.text_sm,
        letterSpacing: 0.5,
        color: COLORS.black800,
    },
    priceTxt: {
        ...SIZES2.text_md,
        letterSpacing: 0.5,
        textAlign: 'center',
        color: COLORS.secondary_color,
    },
    checkBoxIcon: {
        top: 7,
        right: 10,
        position: "absolute",
    },
    status: {
        top: 7,
        left: 10,
        position: "absolute",
        fontSize: 8,
        fontWeight: "bold",
        color: COLORS.black700
    }
});
