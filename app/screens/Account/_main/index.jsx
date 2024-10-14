//
import React, { useCallback, useEffect, useState } from 'react';
import { navigateScreen } from './services';
import SettingCards from '../../../components/SettingCards';
import UserProfile from '../../../components/UserProfile';
import { useNavigation } from '@react-navigation/core';
import { appLayout, COLORS, LAY_OUT } from '../../../theme/globalStyle';
import { Devider, Header, ImageViewer } from '../../../components';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { get } from '../../../api/get';
import { authorizedGet } from '../../../api/authorizedGet'
import { useFocusEffect } from '@react-navigation/native'
import LogOutModal from '../logoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IosAndroidSafeArea from '../../../components/iosAndroidSafeArea'
//
const { height } = Dimensions.get('window');
//
const AccountScreen = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const { navigate } = useNavigation()

    const getProfileData = async () => {
        try {
            const { result } = await authorizedGet("authenticate/profileData", setError, setLoading)
            if (result?.message == "No User Found") {
                await AsyncStorage.removeItem("isLoggedIn")
                await AsyncStorage.removeItem("accessToken")
                checkLoggedIn()
            }
            setUser(result)
        } catch (error) {
            console.log(error);
        }

    }

    const checkLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(value === 'true');
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoggedIn(false); // Default value if fetching fails
        }
    };
    const onLogOut = async () => {
        await AsyncStorage.removeItem("isLoggedIn")
        await AsyncStorage.removeItem("accessToken")
        navigate('HomeStack', {
            screen: 'Home'
        })
        // Send the answer to the backend
        hideModal(false)
    }


    useFocusEffect(
        useCallback(() => {
            getProfileData()
            checkLoggedIn();
        }, [])
    )
    const onSignIn = () => {
        navigate('AuthStack', {
            screen: 'LoginStack'
        })
    }
    console.log(user, isLoggedIn);
    return (
        <View style={styles.mainContainer}>
            <IosAndroidSafeArea />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <Header title="My Profile" showProfileIcon={false} />
                    {/* <Devider /> */}
                    <UserProfile user={user} isLoggedIn={isLoggedIn} onSignIn={onSignIn} />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    {/* <Devider /> */}
                    {/* <SettingCards
                        title="Notifications"
                        iconBg={COLORS.light_green_color}
                        onClickHandler={() => navigate("HomeStack", { screen: "Notifications" })}
                    /> */}
                    {/* <Devider height={23} />
                    <SettingCards
                        title="Saved"
                        iconBg={COLORS.light_green_color}
                        onClickHandler={() => {
                            navigateScreen(navigate, "Favourites")
                        }}
                    /> */}
                    {
                        isLoggedIn &&
                        <>
                            <Devider height={23} />
                            <SettingCards
                                title="Edit Profile"
                                iconName="edit" iconBg="#FAE8B5"
                                onClickHandler={() => {
                                    navigate("EditProfile", { user })
                                    // navigateScreen(navigate, "EditProfile")
                                }}
                            />
                        </>
                    }
                    {/* <Devider height={23} /> */}
                    {
                        isLoggedIn &&
                        <>
                            <SettingCards
                                title="Change Password"
                                iconName="edit-2" iconBg="#8bc4c2"
                                onClickHandler={() => {
                                    navigate("ChangePassword", { user })
                                    // navigateScreen(navigate, "ChangePassword")
                                }}
                            />
                        </>
                    }
                    <SettingCards
                        title="Support"
                        iconName="help-circle" iconBg="#8bc4c2"
                        onClickHandler={() => {
                            navigateScreen(navigate, "Support")
                        }}
                    />
                    <SettingCards
                        title="Privacy & Policy"
                        iconName="info" iconBg="#8bc4c2"
                        onClickHandler={() => {
                            navigateScreen(navigate, "Privacy And Policy")
                        }}
                    />
                    {
                        isLoggedIn &&
                        <>
                            <Devider height={23} />
                            <SettingCards
                                title="Logout"
                                iconName="log-out" iconBg="#FAB5B5"
                                onClickHandler={() => {
                                    setModalVisible(true)
                                }}
                            />
                        </>
                    }
                </View>
            </ScrollView>
            {modalVisible && <LogOutModal hideModal={setModalVisible} />}

        </View>
    )
}
//
export default AccountScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    head: {
        zIndex: 0,
        width: '100%',
        // paddingBottom: '5%',
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    imageViewCon: {
        alignSelf: 'center'
    },
    body: {
        flex: 1,
        // zIndex: 1000,
        padding: LAY_OUT.padding,
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary
    },
})
//