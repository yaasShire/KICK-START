//
import React, { useState } from 'react';
import { COLORS } from '../../../theme/globalStyle';
import { useNavigation } from '@react-navigation/core';
import { Searchbar, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomInput, Devider, ListHeader } from '../../../components';
import { FlatList, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import SearchingCard from './components/SearchingCard';
import { nearByFutsalsData } from '../../../data';
//
const SearchingScreen = () => {
    const { navigatem, goBack } = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg_primary} />
            <View style={styles.head}>
                <Pressable onPress={() => goBack()}>
                    <Ionicons name="close-sharp" size={33} color={COLORS.black900} />
                </Pressable>
                <Searchbar
                    focusable={true}
                    value={searchQuery}
                    style={styles.searchStyle}
                    placeholder="Search here..."
                    onChangeText={onChangeSearch}
                    loading={searchQuery.length > 0 ? true : false}
                    inputStyle={{ height: 30, alignSelf: 'center' }}
                />
            </View>
            <ScrollView style={styles.scrollCon}>
                <Devider />
                <FlatList
                    scrollEnabled={false}
                    data={nearByFutsalsData}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.FlatListCon}
                    renderItem={({ item }) => <SearchingCard {...item} />}
                    ListHeaderComponent={() => <ListHeader title="Recent Search" />}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default SearchingScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    head: {
        padding: '3%',
        columnGap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    searchStyle: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: COLORS.light_green_color,
        backgroundColor: COLORS.bg_primary,
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: COLORS.bg_primary
    },
    FlatListCon: {
        rowGap: 15
    }
})
//