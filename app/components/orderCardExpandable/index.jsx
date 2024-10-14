import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { formatReadableDate } from '../../utilities/data';
import { COLORS, SIZES2 } from '../../theme/globalStyle';
import BookedFutsalCards from '../BookedFutsals';


const OrderCardExpandable = ({ data = {} }) => {
    const [expand, setExpand] = useState(false)

    const venueName = data?.recurringBookings[0]?.venue?.name
    const bookingDate = data?.recurringBookings[0]?.bookingDate
    const bookingsLength = data?.recurringBookings?.length
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.imgTextWrapper}>
                    <Image source={{ uri: data?.recurringBookings[0]?.image }} style={styles.img} />
                    <Text style={[SIZES2.text_md]}>{venueName}</Text>
                    <View style={styles.dot} />
                    <Text style={[SIZES2.text_md, { fontWeight: 400 }]}>{formatReadableDate(bookingDate)}</Text>
                </View>
                <View style={styles.lengthIconWrapper}>
                    <View style={styles.lengthWrapper}>
                        <Text style={[SIZES2.text_md, { color: COLORS.linkColor }]}>{bookingsLength}</Text>
                    </View>
                    <Feather style={{ padding: 5 }} onPress={() => setExpand(expand => !expand)} name={expand ? 'chevron-up' : 'chevron-down'} size={15} color={"rgba(0, 0, 0, .7)"} />
                </View>
            </View>
            {
                expand &&
                <View style={{ backgroundColor: COLORS.bg_secondary, padding: 8, borderRadius: 10 }}>
                    <FlatList
                        data={data?.recurringBookings}
                        contentContainerStyle={{ rowGap: 10 }}
                        style={{ rowGap: 10 }}
                        renderItem={({ item }) => (
                            <BookedFutsalCards data={item} />
                        )}
                    />
                </View>
            }

        </View>
    )
}

export default OrderCardExpandable

// 
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        borderWidth: .5,
        borderColor: COLORS.gray_color,
        borderRadius: 5,
        marginBottom: 10
    },
    img: {
        width: 25,
        height: 25,
        resizeMode: "cover",
        borderRadius: 50,
    },
    lengthIconWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    lengthWrapper: {
        backgroundColor: COLORS.gray_color,
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 5
    },
    imgTextWrapper: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
    },
    dot: {
        width: 5,
        height: 5,
        backgroundColor: COLORS.gray_font_color,
        borderRadius: 50
    },
})