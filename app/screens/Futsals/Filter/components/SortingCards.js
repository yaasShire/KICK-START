//
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const { width, height } = Dimensions.get('screen');
//
const SortingCard = ({ id, label, selectCard = '', onSelectCard = () => { } }) => {
    const isActive = useMemo(() => {
        return selectCard == label;
    }, [selectCard])
    //
    return (
        <Pressable onPress={onSelectCard} style={[styles.container, { borderColor: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
            <MaterialCommunityIcons
                size={23}
                style={styles.checkBoxIcon}
                color={isActive ? COLORS.primary_color : COLORS.gray_color}
                name={isActive ? "checkbox-marked-outline" : "checkbox-blank-outline"}
            />
            <Text style={[styles.labelTxt, { color: isActive ? COLORS.primary_color : COLORS.black800 }]}>
                {label}
            </Text>
        </Pressable>
    )
}
//
export default SortingCard;
//
const styles = StyleSheet.create({
    container: {
        width: '47%',
        padding: '4%',
        columnGap: 10,
        borderRadius: 4,
        marginRight: '6%',
        borderWidth: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    labelTxt: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.black800,
    },
    checkBoxIcon: {
        // top: 0,
        // right: 0,
        // position: "absolute",
    },
})
//