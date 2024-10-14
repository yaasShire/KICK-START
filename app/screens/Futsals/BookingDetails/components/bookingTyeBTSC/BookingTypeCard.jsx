import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-ui-lib'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import { useDispatch } from 'react-redux'
import { addBookingType } from '../../../../../redux/homeSlice'

const BookingTypeCard = ({ data = {}, selectedBookingType = "", setSelectedBookingType = () => { }, setShowPaymentModal = () => { }, bookingTypeRef, setShowRecurrenceEndDateModal = () => { }, calculateBookingPrice = () => { } }) => {
    const dispatch = useDispatch()
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {
                setSelectedBookingType(data)
            }}
        >
            <RadioButton size={18}
                selected={data?.name == selectedBookingType?.name ? true : false}
            />
            <Text style={[SIZES2.text_md]}>{data?.name}</Text>
        </TouchableOpacity>
    )
}

export default BookingTypeCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 6,
        backgroundColor: "rgba(217, 217, 217, .5)",
        padding: LAY_OUT.padding,
        borderRadius: 5,
        height: 45
    }
})