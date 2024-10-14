//
import React from 'react';
import { Avatar, Badge } from 'react-native-paper';
import logo from '../../../assets/icon.png';
import { useNavigation } from '@react-navigation/core';
import { appLayout, COLORS, SIZES2 } from '../../theme/globalStyle';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign, Ionicons } from '@expo/vector-icons';
//
const Header = ({ title = null, backIcon = null, showNotificationsIcon = true, user = {}, showProfileIcon = true }) => {
    const { navigate } = useNavigation();

    // 
    const getNotifigationScreen = ({ }) => {
        navigate('Notifications')
    }

    const navigateToSetting = () => {
        navigate("AccountStack", { screen: "Account" })
    }

    // 
    return (
        <View style={styles.container}>
            <Image
                source={logo}
                resizeMode="cover"
                style={{ width: 45, height: 45, resizeMode: "contain", borderRadius: 10 }}
            />
            {/* {
                title ?
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    :
                    <Image
                        source={logo}
                        resizeMode="cover"
                        style={{ width: 90, height: 45 }}
                    />
            } */}
            {/* <Ionicons name='football' size={40} color={"#000"} /> */}

            {
                showProfileIcon && (
                    user?.profileImage != null ?
                        <TouchableOpacity onPress={navigateToSetting}>
                            <Avatar.Image size={45} source={{ uri: user?.profileImage }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={navigateToSetting}>
                            <Avatar.Icon onPress={navigateToSetting} size={45} icon={() => <AntDesign name='user' color={"#fff"} size={15} />} />
                        </TouchableOpacity>
                )
            }
            {
                // showNotificationsIcon &&
                // <Pressable style={styles.iconCon} onPress={getNotifigationScreen} >
                //     <Badge size={17} style={styles.badge} >
                //         View
                //     </Badge>
                //     <MaterialCommunityIcons name="whistle-outline" size={30} color="#000" style={styles.icon} />
                // </Pressable>

            }
        </View>
    )
}
//
export default Header;
//
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        ...SIZES2.text_md,
        color: "#000"
    },
    iconCon: {
        position: "relative"
    },
    icon: {
    },
    badge: {
        top: -7,
        right: -7,
        zIndex: 100,
        position: "absolute",
    }
})
//