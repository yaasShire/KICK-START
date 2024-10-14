import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import BookingTypeCard from './BookingTypeCard'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { addBookingType } from '../../../../../redux/homeSlice'

const BookingTypeBTSC = ({ setShowPaymentModal = () => { }, bookingTypeRef, recurrenceBTSCRef, setShowRecurrenceEndDateModal = () => { }, calculateBookingPrice = () => { } }) => {
  const dispatch = useDispatch()
  const [selectedBookingType, setSelectedBookingType] = useState({
    id: 1,
    name: "ONE_TIME"
  })
  const BookingTypes = [
    {
      id: 1,
      name: "ONE_TIME"
    },
    {
      id: 2,
      name: "WEEKLY"
    },
    {
      id: 3,
      name: "MONTHLY"
    }
  ]
  const handlePress = () => {
    dispatch(addBookingType(selectedBookingType?.name))
    if (selectedBookingType?.name == "ONE_TIME") {
      setShowPaymentModal(true)
    } else if (selectedBookingType?.name == "WEEKLY" || selectedBookingType?.name == "MONTHLY") {
      // setShowRecurrenceEndDateModal(true)
      recurrenceBTSCRef?.current?.expand()

    }
    bookingTypeRef?.current?.close()
  }
  return (
    <View style={styles.container}>
      <Text style={[SIZES2.text_base, { textAlign: "center" }]}>Choose Booking Type</Text>
      {/* <View style={styles.btnCardsWrapper}> */}
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainerStyle}
        data={BookingTypes}
        renderItem={({ item }) => (
          <BookingTypeCard data={item} selectedBookingType={selectedBookingType} setSelectedBookingType={setSelectedBookingType} />
        )}
      />
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btn}
          onPress={handlePress}
        >
          <Text style={[SIZES2.text_md, { color: "#FFF", fontFamily: "popins400" }]}>Choose Plan</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </View>
  )
}

export default BookingTypeBTSC

const styles = StyleSheet.create({
  container: {
    // padding: LAY_OUT.padding,
    rowGap: 10,
    backgroundColor: "#fff",
    height: "100%",

  },
  contentContainerStyle: {
    rowGap: 10,
    padding: LAY_OUT.padding
  },
  btnCardsWrapper: {
    // flex: 1,
    // height: "100%",
    justifyContent: "space-between"
  },
  btnWrapper: {
    padding: LAY_OUT.padding
  },
  btn: {
    backgroundColor: COLORS.primary_color,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 450
  }
})