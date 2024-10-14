//
import React from 'react';
import Devider from '../Devider';
import { StyleSheet, Text, View } from 'react-native';
import { appLayout, COLORS, SIZES2 } from '../../theme/globalStyle';
//
const ListHeader = ({ title = "Title", textButton = null, children, containerStyle, childredConStyle = {}, onClickTextButton = () => { }, numberOfCourts = 0 }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[SIZES2.text_sm]}>
                {title}
            </Text>
            {textButton && <Text onPress={onClickTextButton} style={styles.textButton}>{numberOfCourts}</Text>}
        </View>
    )
}
//
export default ListHeader;
//
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.black900,
    },
    textButton: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.primary_color
    },
})
//