//
import React from 'react';
import { Badge } from 'react-native-paper';
import logo from '../../../assets/images/logo2.png';
import { useNavigation } from '@react-navigation/core';
import { appLayout, COLORS } from '../../theme/globalStyle';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const Header = ({ title = null, backIcon = null, }) => {
    const { navigate } = useNavigation();
    const getNotifigationScreen = () => {
        navigate('Notifications')
    }
    return (
        <View style={styles.container}>
            {
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
            }
            <Pressable style={styles.iconCon} onPress={getNotifigationScreen} >
                <Badge size={17} style={styles.badge} >
                    3
                </Badge>
                <MaterialCommunityIcons name="whistle-outline" size={30} color="#ffffff" style={styles.icon} />
            </Pressable>
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
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: '500',
        color: "#ffffff"
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