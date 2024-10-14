//
import React from 'react';
import Devider from '../Devider';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES2 } from '../../theme/globalStyle';
//
const SubHeader = ({ title = "Title", showNotification = true, titleColor = "#000", notIconColor = "#000", backBtnColor = "#000" }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.iconsCon}>
                <AntDesign
                    name="left" size={25}
                    // style={{ backgroundColor: "blue" }}
                    color={backBtnColor} onPress={() => navigation.pop()}
                />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={[SIZES2.text_md, { color: titleColor }]}>
                        {title}
                    </Text>
                </View>
                {
                    showNotification &&
                    <Pressable style={styles.whistleIconCon} onPress={() => navigation.navigate('Notifications')} >
                        <Badge size={17} style={styles.badge} >
                            3
                        </Badge>
                        <MaterialCommunityIcons name="whistle-outline" size={30} color={notIconColor} style={styles.icon} />
                    </Pressable>
                }
            </View>
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