//
import React, { useMemo, useState } from 'react';
import { COLORS, SIZES2 } from '../../../../theme/globalStyle';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const { width, height } = Dimensions.get('screen');
//
const SelectedGroundCard = ({ id, futsalName, campacity, price, selectFutsal = '', onSelectCard = () => { }, data = {} }) => {
    // get active category
    const isActive = useMemo(() => {
        return selectFutsal == data?.name;
    }, [selectFutsal])
    //
    return (
        <Pressable onPress={onSelectCard} style={[styles.container, { borderColor: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
            <View style={styles.rowCon}>
                <Text style={styles.futsalNameTxt}>
                    {data?.name}
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
                    ${data?.basePrice} per hour
                </Text>
                <View style={styles.campacityCon}>
                    <Text style={styles.campacityText}>
                        {data?.activePlayersPerTeam} vs {data?.activePlayersPerTeam}
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
        rowGap: 10,
        borderWidth: 1,
        borderRadius: 7,
        height: 90,
        width: width / 2,
        padding: '5%',
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
        ...SIZES2.text_md,
        letterSpacing: 0.5,
        color: COLORS.black900
    },
    checkBoxIcon: {
        top: -8,
        right: -4,
        position: 'relative',
    },
    priceText: {
        ...SIZES2.text_sm,
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
        ...SIZES2.text_sm,
        letterSpacing: 0.5,
        color: COLORS.black800,
        textTransform: 'uppercase'
    },
})
//