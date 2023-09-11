//
import React from 'react';
import { COLORS } from '../../../theme/globalStyle';
import { useNavigation } from '@react-navigation/core';
import image from '../../../../assets/images/img1.png';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AuthHeader, CustomBtn, Devider } from '../../../components';
//
const WelcomeScreen = () => {
    const { navigate } = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollCon}>
                <AuthHeader />
                <Devider height={25} />
                <Image
                    source={image}
                    resizeMode="contain"
                    style={{ width: "100%", height: 200 }}
                />
                <Devider />
                <Text style={styles.title}>
                    Find Futsal!
                </Text>
                <Devider height={50} />
                <CustomBtn
                    onClickHandler={() => navigate('SignUpScreen')}
                    title="Create New Account"
                    color={COLORS.black900}
                    style={styles.signUpBtn}
                />
                <Devider />
                <Text style={styles.sepratortitle}>
                    or
                </Text>
                <Devider />
                <CustomBtn
                    onClickHandler={() => navigate('LoginStack')}
                    title="Login"
                    style={styles.loginBtn}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default WelcomeScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
        padding: '4%',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: COLORS.black800,
    },
    loginBtn: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
    },
    signUpBtn: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
        backgroundColor: COLORS.bg_tertiary
    },
    sepratortitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    formCon: {
        minHeight: 200,
        borderRadius: 10,
        backgroundColor: COLORS.bg_primary
    }
})
//