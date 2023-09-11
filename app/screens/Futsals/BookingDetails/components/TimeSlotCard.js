//
import React, { useMemo } from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//
const TimeSlotCard = ({ id, time, status, price, selectedTimeSlot = '', onSelectCard = () => { } }) => {
    const isActive = useMemo(() => {
        return selectedTimeSlot == time;
    }, [selectedTimeSlot])
    const Status = () => {
    }
    //
    return (
        <Pressable onPress={status == "unAvailable" ? Status : onSelectCard} style={[styles.container, { borderColor: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
            <MaterialCommunityIcons
                size={23}
                style={styles.checkBoxIcon}
                color={isActive ? COLORS.primary_color : COLORS.gray_color}
                name={status == "unAvailable" ? "checkbox-blank-off-outline" : isActive ? "checkbox-marked-outline" : "checkbox-blank-outline"}
            />
            <Text style={[styles.status, { color: status == "unAvailable" ? "red" : COLORS.primary_color }]}>
                {status}
            </Text>
            <View style={{ rowGap: 10, marginTop: 7 }}>
                <Text style={[styles.priceTxt, { color: status == "unAvailable" ? COLORS.black700 : isActive ? COLORS.primary_color : COLORS.tertiary_color, textAlign: "center" }]}>
                    ${price}
                </Text>
                <Text style={[styles.dayTxt, { color: status == "unAvailable" ? COLORS.black700 : isActive ? COLORS.primary_color : COLORS.black900 }]}>
                    {time}
                </Text>
            </View>
        </Pressable>
    )
}
//
export default TimeSlotCard;
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
        justifyContent: "center",
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    dayTxt: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5,
        // textAlign: 'center',
        color: COLORS.black800,
        // textTransform: 'uppercase',
    },
    priceTxt: {
        fontSize: 16,
        fontWeight: "bold",
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
})
//