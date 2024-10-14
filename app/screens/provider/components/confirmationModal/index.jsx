import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Button } from 'react-native';
// import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES2 } from '../../../../theme/globalStyle';

const ConfirmationModal = ({ showConfirmationModal = false, setShowConfirmationModal = () => { }, venueId = 0, confirmationTexts = {}, deleteVenue = () => { }, updateVenue = () => { } }) => {
    const { navigate } = useNavigation()
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmationModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setShowConfirmationModal(!showConfirmationModal);
            }}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, .4)" }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <MaterialCommunityIcons name='application-edit' size={28} color={COLORS.linkColor} />
                            </View>
                            <AntDesign name='close' size={20} onPress={() => setShowConfirmationModal(!showConfirmationModal)} />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={[styles.modalText, SIZES2.text_base]}>{confirmationTexts?.title}</Text>
                            <Text style={[styles.modalText, SIZES2.text_md]}>{confirmationTexts?.description}</Text>
                        </View>
                        <View style={styles.btns}>
                            <Button title='Cancel' onPress={() => setShowConfirmationModal(!showConfirmationModal)} />
                            <Button title={confirmationTexts?.label} onPress={() => {
                                if (confirmationTexts?.label == "Delete") {
                                    deleteVenue()
                                }
                                if (confirmationTexts?.label == "Edit") {
                                    updateVenue()
                                }
                                setShowConfirmationModal(!showConfirmationModal)
                            }} />
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
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%",
        height: 240,
        rowGap: 6
    },
    btns: {
        flex: 1,
        width: "100%",
        height: "100%",
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

export default ConfirmationModal;