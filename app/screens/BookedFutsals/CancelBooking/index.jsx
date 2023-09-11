//
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CustomBtn, Devider, SubHeader } from '../../../components';
import futsalLogo from '../../../../assets/images/Futsals/futsalLogo3.png';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CancelBookingModal from './components/CancelBookingModal';
//
const CancelBookingScreen = ({ route }) => {
    const futsalInfo = route.params;
    const { getParent } = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    //
    useEffect(() => {
        getParent().setOptions({ tabBarStyle: { display: 'none' } })
        return () => {
            getParent().setOptions({
                tabBarStyle: {
                    display: 'flex',
                    borderTopColor: 'rgba(0, 0, 0, .2)',
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: Platform.OS === 'android' ? 15 : 30,
                    height: Platform.OS === 'android' ? 70 : 90,
                }
            })
        }
    }, [])
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.scrollCon}>
                {/* Header */}
                <View style={styles.head}>
                    <SubHeader title="" />
                </View>
                <Devider height={40} />
                <View style={styles.cancelBookingCard}>
                    <View style={styles.futsalLogoCon}>
                        <Image
                            resizeMode="cover"
                            source={futsalLogo}
                            style={{ width: "100%", height: "100%", borderRadius: 20 }}
                        />
                    </View>
                    <Devider height={75} />
                    {/* Futsal Name */}
                    <Text style={styles.futsalName}>
                        {futsalInfo.futsalName}
                    </Text>
                    <Devider height={7} />
                    {/* distance and address and distance between icon container */}
                    <View style={[styles.rowCon]}>
                        <MaterialCommunityIcons name="map-marker-distance" size={12} />
                        <Text style={styles.paragraphTxt}>
                            {futsalInfo.distance} | {futsalInfo.address}
                        </Text>
                    </View>
                    <Devider height={13} />
                    {/* Request Status */}
                    <View style={[styles.rowCon, { columnGap: 7 }]}>
                        <FontAwesome
                            name="send"
                            size={20} color={COLORS.tertiary_color}
                        />
                        <Text style={styles.requestStatus}>
                            Request Sent
                        </Text>
                    </View>
                    <Devider height={13} />
                    {/* Sepretor Container */}
                    <View style={styles.sepratorCon}>
                        <View style={styles.circle1} />
                        <View style={styles.line} />
                        <View style={styles.circle2} />
                    </View>
                    <Devider height={5} />
                    {/* Court Info Card Container */}
                    <View style={styles.courtInfoCon}>
                        <CourtInfo title="Ground" value={"Ground 1"} />
                        <CourtInfo title="Booking ID" value={"9AD23ED45"} side="right" />
                        <CourtInfo title="Date" value={"Mon-May 20"} />
                        <CourtInfo title="Time" value={"9:00 PM - 10:00 PM"} side="right" />
                    </View>
                </View>
                <Devider />
                <View style={styles.controlsCon}>
                    <Text style={styles.messageTxt}>
                        Someone from the Futsal will accept your request
                        and will contect you soon
                    </Text>
                    <Devider />
                    <CustomBtn
                        color="red"
                        title="Cancel Booking"
                        style={{ backgroundColor: "#ffffff" }}
                        onClickHandler={() => setModalVisible(true)}
                    />
                    <Devider />
                    <CustomBtn
                        title="Back"
                        color={COLORS.primary_color}
                        style={{ backgroundColor: "#ffffff" }}
                    />
                </View>
                {/* Cancel Booking Modal */}
                {modalVisible && <CancelBookingModal hideModal={setModalVisible} />}
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default CancelBookingScreen;
//
const CourtInfo = ({ title, value, side = "left" }) => {
    return (
        <View style={[styles.courtCardCon, { alignItems: side == "left" ? "flex-start" : "flex-end" }]}>
            <Text style={styles.courtTitile}>
                {title}
            </Text>
            <Text style={styles.courtValue}>
                {value}
            </Text>
        </View>
    )
}
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color
    },
    scrollCon: {
        flex: 1,
    },
    head: {
        padding: appLayout.padding
    },
    cancelBookingCard: {
        zIndex: 0,
        width: '90%',
        height: 370,
        borderRadius: 10,
        marginLeft: "5%",
        backgroundColor: "#fff"
    },
    futsalLogoCon: {
        width: 130,
        height: 115,
        borderRadius: 50,
        top: -60,
        alignSelf: "center",
        position: "absolute",
        backgroundColor: "blue"
    },
    futsalName: {
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.5,
        textAlign: "center",
        color: COLORS.black900
    },
    rowCon: {
        columnGap: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    paragraphTxt: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.5,
        textAlign: "center",
        color: COLORS.black800
    },
    requestStatus: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
        color: COLORS.tertiary_color
    },
    sepratorCon: {
        flexDirection: "row",
        alignItems: "center",
    },
    circle1: {
        width: 30,
        height: 30,
        borderRadius: 50,
        left: -15,
        position: "relative",
        backgroundColor: COLORS.primary_color
    },
    circle2: {
        width: 30,
        height: 30,
        borderRadius: 50,
        right: -15,
        position: "relative",
        backgroundColor: COLORS.primary_color
    },
    line: {
        flex: 1,
        height: 0.5,
        backgroundColor: COLORS.primary_color
    },
    courtInfoCon: {
        rowGap: 20,
        padding: '5%',
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    courtCardCon: {
        rowGap: 5,
        width: "45%",
    },
    courtTitile: {
        fontSize: 14,
        // fontWeight: "500",
        letterSpacing: 0.5,
        color: COLORS.black800
    },
    courtValue: {
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.5,
        color: COLORS.primary_color
    },
    controlsCon: {
        padding: appLayout.padding
    },
    messageTxt: {
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.5,
        textAlign: "center",
        color: COLORS.bg_primary
    }
})
//