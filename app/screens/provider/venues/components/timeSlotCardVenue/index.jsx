//
import React, { useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle';
import MenueActionsList from '../menuListActions';

//
const TimeSlotCardVenue = ({ data = {}, selectedDate = "", deleteTimeSlot = () => { }, updateTimeSlot = () => { } }) => {
    const bookedDates = data?.bookedDates ?? []



    const Status = () => {
    }
    //
    return (
        <Pressable style={[styles.container]}>
            <View style={styles.priceActionsWrapper}>
                <View style={styles.priceWrapper}>
                    <Text style={[styles.priceTxt, { color: COLORS.primary_color, textAlign: "center" }]}>
                        ${data?.price}
                    </Text>
                </View>
                <MenueActionsList onDelete={() => deleteTimeSlot(data?.id)} onEdit={() => updateTimeSlot(data)} />
            </View>
            <View style={{ rowGap: 10, marginTop: 7 }}>

                <Text style={[SIZES2.text_sm, { color: "#000" }]}>
                    {data?.startTime}- {data?.endTime}
                </Text>
            </View>
        </Pressable>
    )
}
//
export default TimeSlotCardVenue;
//
const styles = StyleSheet.create({
    container: {
        width: new Dimensions.get("screen").width / 2.22,
        paddingHorizontal: 1,
        paddingVertical: "4%",
        // flexWrap: "wrap",
        columnGap: 10,
        borderRadius: 4,
        // marginRight: '6%',
        borderWidth: 0.9,
        alignItems: 'center',
        justifyContent: "center",
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    priceActionsWrapper: {
        flexDirection: "row",
        alignItems: "center"

    },
    priceWrapper: {
        flex: 1
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