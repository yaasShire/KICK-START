//
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert, Modal, StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { CustomBtn, Devider } from '../../../../components';
//
const CancelBookingModal = ({ hideModal = () => { } }) => {
    const [selectAnswer, setSelectAnswer] = useState('');
    //
    const onCancelBooking = () => {
        if (selectAnswer == '') {
            alert('Please Specify The Reason That you are canceling this Futsal')
            return
        }
        // Send the answer to the backend
        hideModal(false)
    }
    //
    return (
        <View style={styles.centeredView}>
            <Modal
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* modalHead */}
                        <View style={styles.modalHead}>
                            <Text style={styles.modalTitle}>
                                Reason to cancel?
                            </Text>
                            <MaterialCommunityIcons
                                size={25}
                                name="window-close"
                                color={COLORS.black900}
                                onPress={() => hideModal(false)}
                            />
                        </View>
                        <Devider height={30} />
                        <AnswersCard
                            selectAns={selectAnswer}
                            onSelectAns={setSelectAnswer}
                            message="I don'n have enough teamamtes"
                        />
                        <AnswersCard
                            selectAns={selectAnswer}
                            onSelectAns={setSelectAnswer}
                            message="I don'n like the venue/host"
                        />
                        <AnswersCard
                            selectAns={selectAnswer}
                            onSelectAns={setSelectAnswer}
                            message="I am shifting to a new venue"
                        />
                        <AnswersCard
                            message="Others"
                            selectAns={selectAnswer}
                            onSelectAns={setSelectAnswer}
                        />
                        <Devider />
                        <CustomBtn
                            color="red"
                            title="Cancel Booking"
                            style={styles.cancelBtn}
                            onClickHandler={onCancelBooking}
                        />
                        <Devider />
                        <CustomBtn
                            title="Not Now"
                            color={COLORS.primary_color}
                            onClickHandler={() => hideModal(false)}
                            style={{ backgroundColor: COLORS.bg_primary }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
//
export default CancelBookingModal;
//
const AnswersCard = ({ message, selectAns, onSelectAns = () => { } }) => {
    //
    const isActive = useMemo(() => {
        return selectAns == message;
    }, [selectAns]);
    //
    return (
        <Pressable style={styles.AnscardCon} onPress={() => onSelectAns(message)}>
            <MaterialCommunityIcons
                size={25}
                color={COLORS.primary_color}
                name={isActive ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"}
            />
            <Text style={styles.msgTxt}>
                {message}
            </Text>
        </Pressable>
    )
}
//
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '6%',
        paddingHorizontal: '2%',
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        width: "100%",
        padding: '5%',
        minHeight: 350,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHead: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.7,
        color: COLORS.black900
    },
    AnscardCon: {
        columnGap: 15,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "5%"
    },
    msgTxt: {
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.6,
        color: COLORS.black900
    },
    cancelBtn: {
        shadowColor: COLORS.black800,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: "#ffffff",
    }
})
//