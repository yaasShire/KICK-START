import { View, Text, StyleSheet, Pressable, Linking } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import { Feather } from '@expo/vector-icons'

const OrderDetail = ({ selectedOrder = {} }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row1}>
                <View style={styles.row1leftContent}>
                    <Avatar.Image size={55} source={{ uri: "https://dudewipes.com/cdn/shop/articles/gigachad.jpg?v=1667928905&width=1024" }} />
                    <View>
                        <Text style={[SIZES2.text_base]}>{selectedOrder?.userName}</Text>
                        <Text style={[SIZES2.text_sm]}>{selectedOrder?.userPhoneNumber}</Text>
                    </View>
                </View>
                <View style={styles.address}>
                    <Text style={[SIZES2.text_md, { color: "#fff" }]}>{selectedOrder?.bookingDate}</Text>
                </View>
            </View>
            <View style={styles.row2}>
                <View style={styles.singleRow}>
                    <Text style={styles.title}>Venue Name</Text>
                    <Text style={styles.value}>{selectedOrder?.venueName}</Text>
                </View>
                <View style={styles.singleRow}>
                    <Text style={styles.title}>Court Name</Text>
                    <Text style={styles.value}>{selectedOrder?.courtName}</Text>
                </View>
                <View style={styles.singleRow}>
                    <Text style={styles.title}>Match Date</Text>
                    <Text style={styles.value}>{selectedOrder?.matchDate}</Text>
                </View>
                <View style={styles.singleRow}>
                    <Text style={styles.title}>Match Time</Text>
                    <Text style={styles.value}>{selectedOrder?.startTime} - {selectedOrder?.endTime}</Text>
                </View>
            </View>
            <View style={styles.row3}>
                <Text>Price</Text>
                <View style={styles.paymentValueWrapper}>
                    <Text style={[SIZES2.text_base, { color: "#fff" }]}>${selectedOrder?.totalPrice}</Text>
                </View>
            </View>
            <View style={styles.row3}>
                <Text>Payment Status</Text>
                <View style={styles.paymentValueWrapper}>
                    <Text style={[SIZES2.text_base, { color: "#fff" }]}>Completed</Text>
                </View>
            </View>
            <View style={styles.actionsWrapper}>
                <Pressable
                    onPress={() => {
                        Linking.openURL(`tel:${selectedOrder?.userPhoneNumber}`)
                    }}
                    style={[styles.actionBtn, styles.callBtn]}>
                    <Feather name='phone-call' size={14} color={"#fff"} />
                    <Text style={[SIZES2.text_base, { color: "#fff" }]}>Call</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        Linking.openURL(
                            `http://api.whatsapp.com/send?phone=252${selectedOrder?.userPhoneNumber}`
                        )
                    }}
                    style={[styles.actionBtn, styles.messageBtn]}>
                    <Feather name='message-circle' size={14} color={"#fff"} />
                    <Text style={[SIZES2.text_base, { color: "#fff" }]}>Message</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default OrderDetail

const styles = StyleSheet.create({
    container: {
        padding: LAY_OUT.padding,
        rowGap: 15
    },
    row1: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: LAY_OUT.padding,
        borderRadius: 8
    },
    row1leftContent: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    },
    address: {
        borderRadius: 10,
        padding: 3,
        paddingHorizontal: 7,
        backgroundColor: COLORS.gray_font_color
    },
    row2: {
        backgroundColor: "#fff",
        padding: 8,
        rowGap: 15,
        borderRadius: 10
    },
    singleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        ...SIZES2.text_sm,
        fontFamily: "poppins400"
    },
    value: {
        ...SIZES2.text_sm
    },
    row3: {
        padding: 8,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8
    },
    paymentValueWrapper: {
        backgroundColor: "#94c85b",
        padding: 6,
        paddingHorizontal: 10,
        rowGap: 15,
        borderRadius: 10
    },
    actionsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    actionBtn: {
        backgroundColor: "blue",
        height: 40,
        width: 130,
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 5,
        alignItems: "center",
        borderRadius: 20
    },
    callBtn: {
        backgroundColor: "#5fc993"
    },
    messageBtn: {
        backgroundColor: "#47c355"
    }
})