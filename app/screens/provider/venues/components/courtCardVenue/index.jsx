//
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import courtImage from '../../../../../../assets/images/Futsals/futsal1.jpeg'
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle';
import CustomButton from '../../../../../components/CustomBtn';
import MenueActionsList from '../menuListActions';
//
const CourtCardVenue = ({ data = {}, venueId = 0, distance = 0, venueAddress = "", venueCity = "", onPress = () => { }, setShowConfirmationModal = () => { }, setConfirmationTexts = {}, setCourt = () => { } }) => {
    const { navigate } = useNavigation();
    const onEdit = () => {
        setCourt(data)
        setConfirmationTexts({
            title: "Edit Court",
            description: "If you want to edit this court please confirm.",
            label: "Edit"
        })
        setShowConfirmationModal(true)
    }
    const onDelete = () => {
        setCourt(data)
        setConfirmationTexts({
            title: "Delete Court",
            description: "If you want to delete this court please confirm.",
            label: "Delete"
        })
        setShowConfirmationModal(true)
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageCon}>
                <Image
                    source={courtImage}
                    resizeMode="cover"
                    style={{ width: '100%', height: "100%", borderRadius: 7 }}
                />
            </View>
            <View style={styles.contentCon}>
                {/* futsal name */}
                <View style={styles.nameActionsListWrapper}>
                    <Text style={styles.headingTxt}>
                        {data?.name}
                    </Text>
                    <MenueActionsList onEdit={onEdit} onDelete={onDelete} />
                </View>
                {/* campacity and price per hour container */}
                <View style={[styles.rowCon]}>
                    <Text style={styles.priceText}>
                        ${data?.basePrice}
                    </Text>
                    <View style={styles.campacityCon}>
                        <Text style={styles.campacityText}>
                            {data?.activePlayersPerTeam} VS {data?.activePlayersPerTeam}
                        </Text>
                    </View>
                </View>
                <CustomButton
                    title="View Court"
                    titleStyle={styles.btnTxt}
                    onClickHandler={onPress}
                />
            </View>
        </View>
    )
}
//
export default CourtCardVenue;
//
const styles = StyleSheet.create({
    container: {
        columnGap: 10,
        padding: '3%',
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color,
        flexDirection: 'row',
    },
    nameActionsListWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    imageCon: {
        width: 120,
        height: 100,
        borderRadius: 7,
        backgroundColor: COLORS.light_green_color
    },
    contentCon: {
        flex: 1,
        rowGap: 10,
        minHeight: 90,
        paddingVertical: '1%',
        justifyContent: 'space-between',
        // backgroundColor: COLORS.tertiary_color
    },
    rowCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingTxt: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: COLORS.black900
    },
    paragraphTxt: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: COLORS.black800
    },
    bookingBtn: {
        borderWidth: 1,
        borderColor: COLORS.primary_color,
        backgroundColor: COLORS.bg_primary,
    },
    btnTxt: {
        fontSize: 12,
        fontWeight: "bold"
    },
    priceText: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: COLORS.primary_color
    },
    campacityCon: {
        borderRadius: 50,
        paddingVertical: "1.5%",
        paddingHorizontal: '4%',
        backgroundColor: COLORS.black600
    },
    campacityText: {
        ...SIZES2.text_sm,
        letterSpacing: 0.5,
        color: COLORS.black800,
        textTransform: 'uppercase'
    },
})
//