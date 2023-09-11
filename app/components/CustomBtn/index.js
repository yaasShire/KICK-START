//
import React from 'react';
import { COLORS } from '../../theme/globalStyle';
import { Pressable, StyleSheet, Text, TouchableOpacity, } from 'react-native';
//
const CustomButton = ({ title = "Title", style = {}, color = "#ffffff", titleStyle = {}, onClickHandler = () => { } }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onClickHandler} activeOpacity={0.8}>
            <Text style={[styles.title, , titleStyle, { color: color }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
//
export default CustomButton;
//
const styles = StyleSheet.create({
    container: {
        padding: '3.4%',
        borderRadius: 5,
        backgroundColor: COLORS.primary_color
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.9,
        textAlign: 'center',
        color: COLORS.bg_primary
    }
})
//