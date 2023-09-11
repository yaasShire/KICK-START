//
import React from 'react';
import Devider from '../Devider';
import { StyleSheet, Text, View } from 'react-native';
import { appLayout, COLORS } from '../../theme/globalStyle';
//
const Container = ({ title = "Title", viewAll = null, children, containerStyle, childredConStyle = {}, onViewAll = () => { } }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.titleCon}>
                <Text style={styles.title}>
                    {title}
                </Text>
                {viewAll && <Text onPress={onViewAll} style={styles.viewAll}>{viewAll}</Text>}
            </View>
            <Devider height={3} />
            <View style={[styles.childrenCon, childredConStyle]}>
                {children}
            </View>
        </View>
    )
}
//
export default Container;
//
const styles = StyleSheet.create({
    container: {

    },
    titleCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: appLayout.padding,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.black900,
    },
    viewAll: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.primary_color
    },
    childrenCon: {
        paddingVertical: '3%',
    }
})
//