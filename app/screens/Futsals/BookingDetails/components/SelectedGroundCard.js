//
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const { width, height } = Dimensions.get('screen');
//
const SelectedGroundCard = ({ id, futsalName, campacity, price, selectFutsal = '', onSelectCard = () => { } }) => {
    // get active category
    const isActive = useMemo(() => {
        return selectFutsal == futsalName;
    }, [selectFutsal])
    //
    return (
        <Pressable onPress={onSelectCard} style={[styles.container, { borderColor: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
            <View style={styles.rowCon}>
                <Text style={styles.futsalNameTxt}>
                    {futsalName}
                </Text>
                <MaterialCommunityIcons
                    size={23}
                    style={styles.checkBoxIcon}
                    color={isActive ? COLORS.primary_color : COLORS.gray_color}
                    name={isActive ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                />
            </View>
            <View style={[styles.rowCon]}>
                <Text style={styles.priceText}>
                    {price} per hour
                    </Text>
                <View style={styles.campacityCon}>
                    <Text style={styles.campacityText}>
                        {campacity}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}
//
export default SelectedGroundCard;
//
const styles = StyleSheet.create({
    container: {
        height: 80,
        rowGap: 10,
        borderWidth: 1,
        borderRadius: 7,
        height: 100,
        width: width / 2,
        paddingHorizontal: '6%',
        justifyContent: "center",
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    rowCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    futsalNameTxt: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: COLORS.black900
    },
    checkBoxIcon: {
        top: -14,
        right: -4,
        position: 'relative',
    },
    priceText: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: COLORS.primary_color
    },
    campacityCon: {
        borderRadius: 50,
        paddingVertical: "1.5%",
        paddingHorizontal: '4%',
        backgroundColor: COLORS.black600
    },
    campacityText: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.5,
        color: COLORS.black800,
        textTransform: 'uppercase'
    },
})
//