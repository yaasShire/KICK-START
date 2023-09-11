//
import React from 'react';
import { COLORS } from '../../theme/globalStyle';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pressable, StyleSheet, Text, View } from 'react-native';
//
const SearchingBtn = () => {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigate('Searching')} style={styles.searchFeild}>
                <AntDesign name="search1" size={23} color={COLORS.primary_color} />
                <Text style={styles.text}>
                    Search Futsal
                </Text>
            </Pressable>
            <Pressable onPress={() => navigate('Filtering')} style={styles.filterBtn}>
                <AntDesign name="filter" size={25} color={COLORS.primary_color} />
            </Pressable>
        </View>
    )
}
//
export default SearchingBtn;
//
const styles = StyleSheet.create({
    container: {
        columnGap: 15,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchFeild: {
        flex: 1,
        columnGap: 7,
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3.5%',
        borderRadius: 5,
        backgroundColor: COLORS.bg_tertiary
    },
    filterBtn: {
        padding: '3%',
        borderRadius: 5,
        backgroundColor: COLORS.bg_primary
    },
    text: {
        fontSize: 15,
        fontWeight: "400",
        color: COLORS.black800
    }
})
//