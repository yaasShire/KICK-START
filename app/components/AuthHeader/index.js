//
import React from 'react';
import Devider from '../Devider';
import { COLORS } from '../../theme/globalStyle';
import logo from '../../../assets/images/logo3.png';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, StyleSheet, Text, View } from 'react-native';
//
const AuthHeader = () => {
    const navigation = useNavigation();
    return (
        <View>
            <AntDesign onPress={() => navigation.pop()} name="left" size={25} />
            <Devider />
            <View style={styles.logoCon}>
                <Image
                    source={logo}
                    resizeMode="contain"
                    style={{ width: 60, height: 60 }}
                />
                <Devider height={10} />
                <Text style={styles.appName}>
                    Sport On
                </Text>
            </View>
        </View>
    )
}
//
export default AuthHeader;
//
const styles = StyleSheet.create({
    logoCon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    appName: {
        fontSize: 17,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: COLORS.primary_color,
    }
})
//