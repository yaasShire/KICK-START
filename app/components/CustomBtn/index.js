//
import React from 'react';
import { COLORS, SIZES2 } from '../../theme/globalStyle';
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, } from 'react-native';
//
const CustomButton = ({ title = "Title", style = {}, color = "#ffffff", titleStyle = {}, onClickHandler = () => { }, loading = false, disableBtn = false, customStyle = {}, textStyle = {} }) => {
    return (
        <TouchableOpacity disabled={disableBtn} style={[styles.container(disableBtn, customStyle), style]} onPress={onClickHandler} activeOpacity={0.8}>
            {
                loading ?
                    <ActivityIndicator size={'small'} color={COLORS.bg_primary} />
                    :
                    <Text style={[styles.title, , titleStyle, SIZES2.text_md, { color: color, ...textStyle }]}>
                        {title}
                    </Text>
            }

        </TouchableOpacity>
    )
}
//
export default CustomButton;
//
const styles = StyleSheet.create({
    container: (disableBtn, customStyle) => ({
        padding: '3.9%',
        borderRadius: 5,
        backgroundColor: COLORS.primary_color,
        opacity: disableBtn ? .6 : 1,
        ...customStyle
    }),
    title: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.9,
        textAlign: 'center',
        color: COLORS.bg_primary
    }
})
//