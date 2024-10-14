import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import futsalImage from '../../../../../../assets/images/ai.jpg'
import TimeSlotCardVenue from '../timeSlotCardVenue'
import { AntDesign } from '@expo/vector-icons'
import { authorizeProviderGet } from '../../../../../api/authorizedProviderGet'
import { ActivityIndicator } from 'react-native-paper'
import { authorizedProviderDelete } from '../../../../../api/authorizedProviderDelete'
import { useDispatch } from 'react-redux'
import { addTimeSlotUpdateData } from '../../../../../redux/venue'
import EmptyC from '../../../components/emptyC'

const CourtDetail = ({
    courtDetailRef, timeSlotRegistrationRef, selectedCourt = {}, timeSlots = [], timeSlotLoading = false, onRefresh = () => { },
    setUpdateTimeSlot = () => { }, setTimeSlotUpdateCurrentValues = () => { }
}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const deleteTimeSlot = async (timeSlotId = 0) => {
        try {
            const { result } = await authorizedProviderDelete(`timeslot/delete/${timeSlotId}`, setError, setLoading)
            console.log(result);
            if (result?.message == "Time Slot Deleted Successfully") {
                onRefresh()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const updateTimeSlot = async (data = {}) => {
        try {
            setUpdateTimeSlot(true)
            setTimeSlotUpdateCurrentValues(data)
            dispatch(addTimeSlotUpdateData(data))
            timeSlotRegistrationRef?.current?.expand()
        } catch (error) {
            console.log(error);
        }
    }

    console.log(timeSlots);

    return (

        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.row1}>
                    <View style={styles.imgWrapper}>
                        <View style={styles.subImgWrapper}>
                            <Image source={futsalImage} style={styles.img} />
                        </View>
                    </View>
                    <View style={styles.contentWrapper}>
                        <Text style={[SIZES2.text_base]}>{selectedCourt?.name}</Text>
                        <View style={styles.subRowWrapper}>
                            <Text style={[SIZES2.text_md, { fontFamily: "poppins400", color: "rgba(0, 0, 0, .7)" }]}>Base Price Per Hour:</Text>
                            <Text style={[SIZES2.text_lg, { color: COLORS.linkColor, fontFamily: "poppins600" }]}>${selectedCourt?.basePrice}</Text>
                        </View>
                        <View style={styles.subRowWrapper}>
                            <Text style={[SIZES2.text_md, { fontFamily: "poppins400", color: "rgba(0, 0, 0, .7)" }]}>Surface Type:</Text>
                            <Text style={[SIZES2.text_lg]}>{selectedCourt?.surface}</Text>
                        </View>
                        <View style={styles.subRowWrapper}>
                            <Text style={[SIZES2.text_md, { fontFamily: "poppins400", color: "rgba(0, 0, 0, .7)" }]}>Dimensions:</Text>
                            <Text style={[SIZES2.text_lg]}>{selectedCourt?.width}m x {selectedCourt?.height}m</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row2}>

                    <Text style={[SIZES2.text_md]}>Number Of Active Players</Text>
                    <View style={styles.numberOfPlayersWrapper}>
                        <Text style={[SIZES2.text_sm, { color: "#fff" }]}>{selectedCourt?.activePlayersPerTeam} Vs {selectedCourt?.activePlayersPerTeam}</Text>
                    </View>
                </View>
                <View style={styles.row3}>
                    <View style={styles.addTitleWrapper}>
                        <Text style={[SIZES2.text_md]}>Time Slots</Text>
                        <TouchableOpacity onPress={() => {
                            setUpdateTimeSlot(false)
                            timeSlotRegistrationRef?.current?.expand()
                            // courtDetailRef?.current?.close()
                        }}>
                            <AntDesign name='pluscircle' size={30} color={"#000"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timeSlotsWrapper}>
                        {
                            !timeSlotLoading ?
                                timeSlots?.map(item => (
                                    <TimeSlotCardVenue data={item} key={item?.id} deleteTimeSlot={deleteTimeSlot} updateTimeSlot={updateTimeSlot} />
                                ))
                                :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <ActivityIndicator size={'small'} color={COLORS.primary_color} />
                                </View>
                        }
                        {
                            (!timeSlots.length && !timeSlotLoading) ? <EmptyC title='No Time Slots Found!' /> : null
                        }
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default CourtDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        rowGap: 15,
        backgroundColor: "#fff"
    },
    imgWrapper: {
    },
    subImgWrapper: {
        borderWidth: 2,
        width: 75,
        height: 78,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: COLORS.linkColor
    },
    img: {
        width: 72,
        height: 75,
        borderRadius: 5
    },
    row1: {
        flexDirection: "row",
        columnGap: 5,

    },
    contentWrapper: {
        flex: 1,
        rowGap: 2
    },
    subRowWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    row2: {
        flexDirection: "row",
        columnGap: 5,
        backgroundColor: "#fff",
        padding: LAY_OUT.padding,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    numberOfPlayersWrapper: {
        backgroundColor: COLORS.green,
        padding: 3,
        paddingHorizontal: 7,
        borderRadius: 50
    },
    row3: {
        rowGap: 20
    },
    timeSlotsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 13
    },
    addTitleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})