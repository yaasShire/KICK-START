//
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS, appLayout } from '../../../theme/globalStyle';
import { Devider, Header, SearchingBtn, Container, FutsalCards, BookedFutsalCards, ListHeader } from '../../../components';
import { Dimensions, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, Button, FlatList, Platform } from 'react-native';
import { nearByFutsalsData } from '../../../data';
//
const { width, height } = Dimensions.get('window');
//
const FutsalsScreen = ({ route }) => {
    const { navigate } = useNavigation();
    const [locationPermision, setLocationPermision] = useState(true)
    const viewAll = () => {
        alert('View All')
    }
    return (
        <SafeAreaView style={styles.mainContainer}  >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary_color} />
            <ScrollView nestedScrollEnabled={false} style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <Header title="All Futsals" />
                    <Devider height={20} />
                    <SearchingBtn />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider />
                    <FlatList
                        scrollEnabled={false}
                        data={nearByFutsalsData}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <FutsalCards {...item} />}
                        ListHeaderComponent={() => <ListHeader title="All Futsals" textButton={nearByFutsalsData.length} />}
                    />
                    <Devider />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default FutsalsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    scrollCon: {
        // paddingBottom: '15%'
    },
    head: {
        width: '100%',
        paddingBottom: '5%',
        zIndex: 0,
        padding: appLayout.padding,
    },
    body: {
        flex: 1,
        zIndex: 1000,
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_tertiary
    },
    flatListCon: {
        rowGap: 20,
        paddingHorizontal: appLayout.paddingX
    },
    nearByFutsalsCardCon: {
        columnGap: 10,
        paddingHorizontal: appLayout.padding,
    },
    allFutsalsCon: {
        rowGap: 20,
        paddingHorizontal: appLayout.paddingX
    }
})
//