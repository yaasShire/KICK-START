import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native'
import React from 'react'
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle'
import { Entypo } from '@expo/vector-icons'
import aiImage from '../../../../../../assets/images/ai.jpg'
import MenueActionsList from '../menuListActions'

const VenueCard = ({ onPress = () => { }, data = {}, setConfirmationTexts = () => { }, setShowConfirmationModal = () => { }, setVenue = () => { } }) => {
    const onEdit = () => {
        setVenue(data)
        setConfirmationTexts({
            title: "Edit Court",
            description: "If you want to edit this court please confirm.",
            label: "Edit"
        })
        setShowConfirmationModal(true)
    }
    const onDelete = () => {
        setVenue(data)
        setConfirmationTexts({
            title: "Delete Court",
            description: "If you want to delete this court please confirm.",
            label: "Delete"
        })
        setShowConfirmationModal(true)
    }
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View>
                <Image style={styles.venueImg} source={{ uri: data?.images[0] }} />
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.nameMenuWrapper}>
                    <Text style={[SIZES2.text_md]}>{data?.name}</Text>
                    <MenueActionsList onEdit={onEdit} onDelete={onDelete} showEdit={false} />
                </View>
                <View style={styles.address}>
                    <Entypo name='location' size={15} color={COLORS.linkColor} />
                    <Text numberOfLines={1} style={[SIZES2.text_sm, { width: "87%" }]}>{data?.address}/{data?.city}</Text>
                </View>
                <View style={styles.courtNumberWrapper}>
                    <Text style={[SIZES2.text_sm, { color: "#000" }]}>Courts: :{data?.numberOfCourts}</Text>
                </View>
                <View style={styles.openCloseTime}>
                    <Text style={[SIZES2.text_sm, { color: "#fff" }]}>Schedule:</Text>
                    <View>
                        <Text style={[SIZES2.text_sm, { color: "#fff" }]}>{data?.openTime} - {data?.closeTime}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default VenueCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 6,
        padding: 5,
        maxHeight: Platform.OS == 'android' ? 153 : 137,
        columnGap: 6,
        borderWidth: 1,
        borderColor: COLORS.bg_secondary
    },
    venueImg: {
        width: 120,
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10
    },
    address: {
        flexDirection: "row",
        columnGap: 5,

    },
    contentWrapper: {
        rowGap: 10,
        flex: 1
    },
    courtNumberWrapper: {
        backgroundColor: COLORS.bg_secondary,
        padding: 4,
        paddingHorizontal: 8,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        width: 100
    },
    nameMenuWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    openCloseTime: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.black_color,
        padding: 8,
        borderRadius: 5
    }
})