//
import React from 'react';
import Devider from '../Devider';
import { COLORS } from '../../theme/globalStyle';
import logo from '../../../assets/icon.png';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, StyleSheet, Text, View } from 'react-native';
//
const AuthHeader = ({ showBackButton = false }) => {
    const navigation = useNavigation();
    return (
        <View>
            {
                showBackButton && <AntDesign onPress={() => navigation.pop()} name="left" size={25} />
            }

            <Devider />
            <View style={styles.logoCon}>
                <Image
                    source={logo}
                    resizeMode="contain"
                    style={{ width: 70, height: 70, borderRadius: 10 }}
                />
                <Devider height={10} />
                {/* <Text style={styles.appName}>
                    Sport On
                </Text> */}
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