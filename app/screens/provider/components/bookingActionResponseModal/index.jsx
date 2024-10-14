import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { SIZES2 } from '../../../../theme/globalStyle';

const BookingResponseActionModal = ({ bookingResponseActionModal = false, setBookingResponseActionModal = () => { }, acceptOrder = () => { }, bookingResponseText = {} }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={bookingResponseActionModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setBookingResponseActionModal(!bookingResponseActionModal);
            }}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, .4)" }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                {
                                    bookingResponseText?.title == "Booking Canceled Successfully" ? <AntDesign name='closecircle' size={35} color={"#e44d5b"} />
                                        : <AntDesign name='checkcircle' size={35} color={"green"} />
                                }

                            </View>
                            {/* <AntDesign name='close' size={20} onPress={() => setBookingResponseActionModal(!rejectOrderModal)} /> */}
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={[styles.modalText, SIZES2.text_base]}>{bookingResponseText?.title}</Text>
                            <Text style={[styles.modalText, SIZES2.text_sm]}>{bookingResponseText?.description}</Text>
                        </View>
                        {/* <View style={styles.btns}>
                            <Button mode='outlined' style={{ borderRadius: 5 }} onPress={() => setBookingResponseActionModal(!bookingResponseActionModal)}>Cancel</Button>
                            <Button mode='contained' style={{ borderRadius: 5 }} onPress={() => {
                                acceptOrder()
                                setBookingResponseActionModal(!bookingResponseActionModal)
                            }}>Accept</Button>
                        </View> */}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%",
        height: 200,
        rowGap: 6
    },
    btns: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    button: {
        borderRadius: 10,
        elevation: 2,
        width: 100,
        height: 45,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    }
});

export default BookingResponseActionModal;