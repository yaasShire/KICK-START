//
import React from 'react';
import { COLORS, SIZES2 } from '../theme/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//
const SettingCards = ({ title = "title", iconName = "heart", iconBg = "blue", onClickHandler = () => { } }) => {
    return (
        <TouchableOpacity onPress={onClickHandler} activeOpacity={0.7} style={styles.container}>
            <View style={styles.sectionOne}>
                <View style={[styles.iconCon, { backgroundColor: iconBg }]}>
                    <Feather name={iconName} size={20} color={COLORS.black900} />
                </View>
                <Text style={[SIZES2.text_sm]}>
                    {title}
                </Text>
            </View>
            <Feather name="chevron-right" color={COLORS.black800} size={27} />
        </TouchableOpacity>
    )
}
//
export default SettingCards;
//
const styles = StyleSheet.create({
    container: {
        padding: '3%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.bg_primary,
        shadowColor: COLORS.black800,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
    },
    sectionOne: {
        columnGap: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.tertiary_color
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.3,
        color: COLORS.black800
    }
})
//