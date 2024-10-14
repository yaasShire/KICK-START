//
import React, { useMemo, useState } from 'react';
import { COLORS, SIZES2 } from '../../../../theme/globalStyle';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addRecurrenceDays, removeRecurrenceDays } from '../../../../redux/homeSlice';

//
const { width, height } = Dimensions.get('screen');
//
const DaysCard = ({ id, day, data = {}, selectedDay = '', onSelectCard = () => { } }) => {
    // 
    const dispatch = useDispatch()
    const selectedRecurrenceDays = useSelector(state => state?.homeSlice?.bookingData?.recurrenceDays)
    const isActive = useMemo(() => {
        return selectedDay == day;
    }, [selectedDay])

    const handleAddRecurrenceDay = (day) => {
        !checkIfSelected(day) ?
            dispatch(addRecurrenceDays(day?.day?.toUpperCase())) : removeDayFromRecurrenceDays(day)
    }
    const checkIfSelected = (day) => {
        const result = selectedRecurrenceDays.find(d => d == day?.day?.toUpperCase())
        return result;
    }
    const removeDayFromRecurrenceDays = (day) => {
        dispatch(removeRecurrenceDays([]))
        const filteredRecurrenceDays = selectedRecurrenceDays.filter(d => d != day?.day?.toUpperCase())
        dispatch(removeRecurrenceDays(filteredRecurrenceDays))

    }

    //
    return (
        <Pressable onPress={() => {
            onSelectCard()
            handleAddRecurrenceDay(data)
        }} style={[styles.container, { borderColor: checkIfSelected(data) ? COLORS.primary_color : COLORS.gray_color }]}>
            <MaterialCommunityIcons
                size={23}
                style={styles.checkBoxIcon}
                color={checkIfSelected(data) ? COLORS.primary_color : COLORS.gray_color}
                name={checkIfSelected(data) ? "checkbox-marked-outline" : "checkbox-blank-outline"}
            />
            <Text style={[SIZES2.text_md, { color: checkIfSelected(data) ? COLORS.primary_color : COLORS.black800 }]}>
                {day}
            </Text>
        </Pressable>
    )
}
//
export default DaysCard;
//
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
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    dayTxt: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        // textAlign: 'center',
        color: COLORS.black800,
        // textTransform: 'uppercase',
    },
    checkBoxIcon: {
        // top: 0,
        // right: 0,
        // position: "absolute",
    },
})
//