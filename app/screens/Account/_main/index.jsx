//
import React from 'react';
import { navigateScreen } from './services';
import { SettingCards } from './components';
import UserProfile from './components/UserProfile';
import { useNavigation } from '@react-navigation/core';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { Devider, Header, ImageViewer } from '../../../components';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const { height } = Dimensions.get('window');
//
const AccountScreen = () => {
    const { navigate } = useNavigation();
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <Header title="My Profile" />
                    <Devider />
                    <UserProfile />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider />
                    <SettingCards
                        title="Notifications"
                        iconBg={COLORS.light_green_color}
                        onClickHandler={() => navigate("AuthStack")}
                    />
                    <Devider height={23} />
                    <SettingCards
                        title="Saved"
                        iconBg={COLORS.light_green_color}
                        onClickHandler={() => navigateScreen(navigate, "Favourites")}
                    />
                    <Devider height={23} />
                    <SettingCards
                        title="Edit Profile"
                        iconName="edit" iconBg="#FAE8B5"
                        onClickHandler={() => navigateScreen(navigate, "EditProfile")}
                    />
                    <Devider height={23} />
                    <SettingCards
                        title="Logout"
                        iconName="log-out" iconBg="#FAB5B5"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default AccountScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: appLayout.padding,
        backgroundColor: COLORS.primary_color
    },
    imageViewCon: {
        alignSelf: 'center'
    },
    body: {
        flex: 1,
        zIndex: 1000,
        padding: '6%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_tertiary
    },
})
//