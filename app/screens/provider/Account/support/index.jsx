import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SIZES2 } from '../../../../theme/globalStyle';
import { useNavigation } from '@react-navigation/native';
import { hideBottomTabs } from '../../../../utilities';

const Support = () => {
    const { getParent } = useNavigation()
    const handleCall = () => {
        // Code to initiate a call goes here
        console.log('Call button pressed');
    };

    const handleMessage = () => {
        // Code to initiate messaging goes here
        console.log('Message button pressed');
    };
    useEffect(() => {
        return hideBottomTabs(getParent)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Support</Text>
            <Text style={styles.description}>
                If you need any help, please feel free to contact us. We are here to assist you 24/7.
            </Text>
            <View style={styles.buttonContainer}>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(`tel:612518368`)
                        }}
                        style={styles.btn}>
                        <Feather name='phone-call' size={28} color={"#fff"} />
                    </TouchableOpacity>
                    <Text style={[SIZES2.text_sm]}>Call</Text>
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(
                                `http://api.whatsapp.com/send?phone=252612518368`
                            )
                        }}
                        style={[styles.btn, { backgroundColor: "#47c355" }]}>
                        <FontAwesome name='whatsapp' size={30} color={"#fff"} />
                    </TouchableOpacity>
                    <Text style={[SIZES2.text_sm]}>Message</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        ...SIZES2.text_base,
        marginBottom: 16,
    },
    description: {
        ...SIZES2.text_sm,
        textAlign: 'center',
        marginBottom: 32,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
    },
    btnWrapper: {
        alignItems: "center",
        rowGap: 10,
        justifyContent: "center"
    },
    btn: {
        backgroundColor: "#000",
        // padding: 10,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Support;
