//
import React from 'react';
import Devider from '../Devider';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const SubHeader = ({ title = "Title", }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.iconsCon}>
                <AntDesign
                    name="left" size={25}
                    // style={{ backgroundColor: "blue" }}
                    color="#ffffff" onPress={() => navigation.pop()}
                />
                <Pressable style={styles.whistleIconCon} onPress={() => navigation.navigate('Notifications')} >
                    <Badge size={17} style={styles.badge} >
                        3
                    </Badge>
                    <MaterialCommunityIcons name="whistle-outline" size={30} color="#ffffff" style={styles.icon} />
                </Pressable>
            </View>
            <Devider />
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}
//
export default SubHeader;
//
const styles = StyleSheet.create({
    iconsCon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        color: "#ffffff",
        letterSpacing: 1,
        fontWeight: '500',
    },
    whistleIconCon: {
        position: "relative"
    },
    badge: {
        top: -7,
        right: -7,
        zIndex: 100,
        position: "absolute",
    }
})
//