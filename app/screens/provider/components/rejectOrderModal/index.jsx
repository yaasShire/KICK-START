import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { SIZES2 } from '../../../../theme/globalStyle';

const RejectOrderModal = ({ rejectOrderModal = false, setRejectOrderModal = () => { }, rejectOrder = () => { } }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={rejectOrderModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setRejectOrderModal(!rejectOrderModal);
            }}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, .4)" }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <Entypo name='shopping-cart' size={24} />
                            </View>
                            <AntDesign name='close' size={20} onPress={() => setRejectOrderModal(!rejectOrderModal)} />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={[styles.modalText, SIZES2.text_base]}>Reject or Cancel Order</Text>
                            <Text style={[styles.modalText, SIZES2.text_md]}>If you want to reject this order click reject otherwise cancel</Text>
                        </View>
                        <View style={styles.btns}>
                            <Button style={{ borderRadius: 5 }} onPress={() => setRejectOrderModal(!rejectOrderModal)}>Cancel</Button>
                            <Button style={{ borderRadius: 5 }} onPress={() => {
                                rejectOrder()
                                setRejectOrderModal(!rejectOrderModal)
                            }}>Reject</Button>
                        </View>
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
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%",
        height: 230,
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

export default RejectOrderModal;