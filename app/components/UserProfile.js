//
import React from 'react';
import { Devider, ImageViewer } from '.';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES2 } from '../theme/globalStyle';
//
const UserProfile = ({ user = {}, isLoggedIn = false, onSignIn = () => { } }) => {
    return (
        <View style={styles.profileCon}>
            <ImageViewer image={user?.profileImage} style={styles.imageViewCon} isLoggedIn={isLoggedIn} onSignIn={onSignIn} />
            {/* <Devider height={8} /> */}
            <View style={styles.profileContentWrapper}>
                <Text style={[SIZES2.text_md]}>
                    {user?.fullName}
                </Text>
                <Text style={[SIZES2.text_sm, { fontFamily: "poppins400" }]}>
                    {user?.email}
                </Text>
                <Text style={[SIZES2.text_sm, { fontFamily: "poppins400" }]}>
                    {user?.phoneNumber}
                </Text>
            </View>
        </View>
    )
}
//
export default UserProfile;
//
const styles = StyleSheet.create({
    profileCon: {
        // rowGap: 5,
        alignItems: 'center',
        rowGap: 5
    },
    profileContentWrapper: {
        alignItems: "center",
        justifyContent: "center"
    },
    userNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: COLORS.black600,
    },
    userInfoTxt: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.bg_secondary
    }
})
//