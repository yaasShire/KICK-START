//
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../../../theme/globalStyle';
import CustomButton from '../../../../components/CustomBtn';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
//
const CourtsCard = ({ id, futsalName, campacity, price, imageUrl }) => {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.imageCon}>
                <Image
                    source={imageUrl}
                    resizeMode="cover"
                    style={{ width: '100%', height: "100%", borderRadius: 7 }}
                />
            </View>
            <View style={styles.contentCon}>
                {/* futsal name */}
                <Text style={styles.headingTxt}>
                    {futsalName}
                </Text>
                {/* campacity and price per hour container */}
                <View style={[styles.rowCon]}>
                    <Text style={styles.priceText}>
                        {price} per hour
                    </Text>
                    <View style={styles.campacityCon}>
                        <Text style={styles.campacityText}>
                            {campacity}
                        </Text>
                    </View>
                </View>
                <CustomButton
                    title="Book This Ground"
                    titleStyle={styles.btnTxt}
                    onClickHandler={() => navigate('FutsalsStack', { screen: "BookingDetails", initial: false, params: { id, futsalName } })}
                />
            </View>
        </View>
    )
}
//
export default CourtsCard;
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
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.5,
        color: COLORS.black800,
        textTransform: 'uppercase'
    },
})
//