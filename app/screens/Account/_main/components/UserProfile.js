//
import React from 'react';
import { Devider, ImageViewer } from '../../../../components';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../theme/globalStyle';
//
const UserProfile = () => {
    return (
        <View style={styles.profileCon}>
            <ImageViewer style={styles.imageViewCon} />
            <Devider height={8} />
            <Text style={styles.userNameText}>
                Abdirahman Abdirashid Ahmed
            </Text>
            <Text style={styles.userInfoTxt}>
                abdirahmanabdirashid429@gmail.com
            </Text>
            <Text style={styles.userInfoTxt}>
                252 61 5 094 596
            </Text>
        </View>
    )
}
//
export default UserProfile;
//
const styles = StyleSheet.create({
    profileCon: {
        rowGap: 5,
        alignItems: 'center',
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