//
import React from 'react';
import Devider from '../../../../components/Devider';
import { COLORS } from '../../../../theme/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import futsalLogo from '../../../../../assets/images/Futsals/futsalLogo3.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const FutsalInfoCard = ({ id, futsalName, distance, address, campacity, price, imageUrl }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.imageCon}>
                    <Image
                        source={futsalLogo}
                        resizeMode="cover"
                        style={{ width: '100%', height: 90, borderRadius: 7 }}
                    />
                </View>
                <View style={styles.contentCon}>
                    {/* futsal name and hear icon container */}
                    <View style={[styles.rowCon, { justifyContent: "space-between" }]}>
                        <Text style={styles.futsalNameTxt}>
                            {futsalName}
                        </Text>
                        <Pressable>
                            <AntDesign name="hearto" size={20} color={COLORS.primary_color} />
                        </Pressable>
                    </View>
                    {/* distance and address and distance between icon container */}
                    <View style={[styles.rowCon, { columnGap: 3, justifyContent: 'flex-start' }]}>
                        <MaterialCommunityIcons name="map-marker-distance" size={12} />
                        <Text style={styles.paragraphTxt}>
                            {distance} | {address}
                        </Text>
                    </View>
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
                </View>
            </View>
            <Devider height={12} />
            <Text style={styles.futsalDes}>
                Located at Sankhamul Chowk, Handrik Futsal is one of the largest and
                most beautiful Futsals in Mogadishu. Easily accessible and just
                amazing surice just for you.
            </Text>
        </View>
    )
}
//
export default FutsalInfoCard;
//
const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        borderRadius: 7,
    },
    container: {
        columnGap: 15,
        flexDirection: 'row',
    },
    imageCon: {
        flex: 0.5,
        borderRadius: 7,
        shadowColor: COLORS.light_green_color,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
        backgroundColor: COLORS.light_green_color
    },
    contentCon: {
        flex: 1,
        rowGap: 10,
        height: 90,
        paddingVertical: '0.4%',
        justifyContent: 'space-between',
    },
    rowCon: {
        columnGap: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    futsalNameTxt: {
        fontSize: 16,
        fontWeight: "bold",
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
    priceText: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: COLORS.primary_color
    },
    campacityCon: {
        borderRadius: 50,
        paddingVertical: "1.5%",
        paddingHorizontal: '4%',
        backgroundColor: COLORS.black600,
    },
    campacityText: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.5,
        color: COLORS.black800,
        textTransform: 'uppercase'
    },
    futsalDes: {
        fontSize: 13,
        fontWeight: '400',
        color: COLORS.black800
    }
})
//