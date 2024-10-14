import { View, Text, StyleSheet, Pressable, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Avatar, Divider } from 'react-native-paper'

const MatchCard = ({ data = {} }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name='football' size={18} />
                <View style={styles.venueCourtNamesWrapper}>
                    <Text style={[SIZES2.text_md]}>{data?.venueName}</Text>
                    <View style={styles.dot} />
                    <Text style={[SIZES2.text_md]}>{data?.courtName}</Text>
                </View>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.row1}>
                    <View style={styles.imagesInfoWrapper}>
                        <Avatar.Image size={40} source={{ uri: data?.userProfileImage }} />
                        <View>
                            <Text style={[SIZES2.text_sm, { width: "100%" }]}>{data?.userName}</Text>
                            <Text style={[SIZES2.text_sm, { color: COLORS.gray_font_color }]}>{data?.userPhoneNumber}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>Saturday, 1 June</Text>
                    </View>
                    <View>
                        <Text style={[SIZES2.text_base, { fontFamily: "poppins600" }]}>${data?.totalPrice}</Text>
                    </View>
                </View>
                <Divider />
                <View style={styles.row2}>
                    <View style={styles.dateWrapper}>
                        <Text style={[SIZES2.text_sm, { color: "#000" }]}>{data?.matchDate}</Text>
                    </View>
                    <View style={styles.matchTimeWrapper}>
                        <Text style={[SIZES2.text_sm, { color: "#fff" }]}>{data?.startTime} - {data?.endTime}</Text>
                    </View>
                    <View style={styles.actionsWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(`tel:${data?.userPhoneNumber}`)
                            }}
                            style={[]}>
                            <Feather name='phone-call' size={20} color={"#000"} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(
                                    `http://api.whatsapp.com/send?phone=252${data?.userPhoneNumber}`
                                )
                            }}
                            style={[]}>
                            <FontAwesome name='whatsapp' size={24} color={"#47c355"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MatchCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 5
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        columnGap: 4,
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_tertiary,
        borderBottomWidth: 1,
        borderColor: COLORS.bg_secondary
    },
    dot: {
        width: 5,
        height: 5,
        backgroundColor: COLORS.gray_font_color,
        borderRadius: 50
    },
    venueCourtNamesWrapper: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    },
    row1: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.padding
    },
    row2: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.padding
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
    cardContent: {
        // padding: LAY_OUT.padding,
        // rowGap: 1
    },
    matchTimeWrapper: {
        backgroundColor: "#000",
        borderRadius: 10,
        padding: 3,
        paddingHorizontal: 9
    },
    dateWrapper: {
        backgroundColor: COLORS.bg_secondary,
        borderRadius: 10,
        padding: 3,
        paddingHorizontal: 9
    },
    actionsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 16
    },
    actionBtn: {
        backgroundColor: "blue",
        height: 30,
        width: 30,
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 5,
        alignItems: "center",
        borderRadius: 50
    },
    callBtn: {
        backgroundColor: "#5fc993"
    },
    messageBtn: {
        backgroundColor: "#47c355"
    }
})