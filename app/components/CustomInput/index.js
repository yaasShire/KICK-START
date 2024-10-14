//
import React from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS, SIZES2 } from '../../theme/globalStyle';
import { StyleSheet, Text, View } from 'react-native';
//
const CustomInput = (props, { ref }) => {
    return (
        <TextInput
            style={[styles.container]}
            {...props}
            mode="flat"
            outlineColor={COLORS.black700}
            selectionColor={COLORS.primary_color}
            activeOutlineColor={COLORS.primary_color}
            ref={ref}
            textColor='#000'
        />
    )
}
//
export default CustomInput;
//
const styles = StyleSheet.create({
    container: {
        // marginBottom: '5%',
        backgroundColor: COLORS.bg_primary,
        color: "#000",
        ...SIZES2.text_md
    }
})
//