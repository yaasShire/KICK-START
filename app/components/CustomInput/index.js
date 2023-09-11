//
import React from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../../theme/globalStyle';
import { StyleSheet, Text, View } from 'react-native';
//
const CustomInput = (props) => {
    return (
        <TextInput
            style={[styles.container]}
            {...props}
            mode="outlined"
            outlineColor={COLORS.black700}
            selectionColor={COLORS.primary_color}
            activeOutlineColor={COLORS.primary_color}
        />
    )
}
//
export default CustomInput;
//
const styles = StyleSheet.create({
    container: {
        marginBottom: '5%',
        backgroundColor: COLORS.bg_primary,
    }
})
//