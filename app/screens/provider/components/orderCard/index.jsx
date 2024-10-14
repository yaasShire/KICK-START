import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'

const OrderCard = ({ data = {}, onPress = () => { }, setSelectedOrder = () => { }, setRejectOrderModal = () => { }, setAcceptOrderModal = () => { }, showActionsBtns = false, showAcceptOrder = false, showCancelOrder = false }) => {

    console.log(data?.userProfileImage);


    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.row1}>
                <View style={styles.imagesInfoWrapper}>
                    {
                        data?.userProfileImage != null ?
                            <Avatar.Image size={40} source={{ uri: data?.userProfileImage }} />
                            :
                            <Avatar.Icon size={40} icon={() => <AntDesign name='user' color={"#fff"} size={15} />} />
                    }
                    <View>
                        <Text style={[SIZES2.text_md]}>{data?.userName}</Text>
                        <Text style={[SIZES2.text_sm, { color: COLORS.gray_font_color }]}>{data?.userPhoneNumber}</Text>
                    </View>
                </View>
                <View>
                    <Text style={[SIZES2.text_sm]}>{data?.bookingDate}</Text>
                </View>
                <View>
                    <Text style={[SIZES2.text_base]}>${data?.totalPrice}</Text>
                </View>
            </View>
            <View style={styles.row2}>
                <View style={styles.dateWrapper}>
                    <Text style={[SIZES2.text_sm, { color: "#000" }]}>{data?.matchDate}</Text>
                </View>
                <View style={styles.venueNameWrapper}>
                    <Text style={[SIZES2.text_sm, { color: "#000" }]}>{data?.venueName}</Text>
                </View>
                {
                    showActionsBtns &&
                    <View style={styles.btnsWrapper}>
                        {
                            showCancelOrder &&
                            <Pressable style={[styles.btn, styles.btnReject]} onPress={() => {
                                setSelectedOrder(data)
                                setRejectOrderModal(true)
                            }}>
                                <Ionicons name='close' color={'#fff'} size={15} />
                            </Pressable>
                        }
                        {
                            showAcceptOrder &&
                            <Pressable style={[styles.btn, styles.btnAccept]} onPress={() => {
                                setSelectedOrder(data)
                                setAcceptOrderModal(true)
                            }}>
                                <Entypo name='check' color={'#fff'} size={15} />
                            </Pressable>
                        }
                    </View>
                }
            </View>
        </Pressable>
    )
}

export default OrderCard

const styles = StyleSheet.create({
    container: {
        height: 100,
        alignItems: "space-between",
        rowGap: 4,
        backgroundColor: "#fff",
        padding: LAY_OUT.padding,
        borderRadius: 8
    },
    row1: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    row2: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    imagesInfoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    },
    btnsWrapper: {
        flexDirection: "row",
        columnGap: 10
    },
    btn: {
        width: 30,
        height: 30,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    btnReject: {
        backgroundColor: "#e44d5b"
    },
    btnAccept: {
        backgroundColor: "#4e8ee0"
    },
    venueNameWrapper: {
        backgroundColor: COLORS.bg_secondary,
        borderRadius: 10,
        padding: 3,
        paddingHorizontal: 7
    },
    dateWrapper: {
        backgroundColor: COLORS.bg_secondary,
        borderRadius: 10,
        padding: 3,
        paddingHorizontal: 7
    }
})