//
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS, appLayout } from '../../../theme/globalStyle';
import { bookedFutsalsData, nearByFutsalsData } from '../../../data';
import { NearByFutsalsCard, NearByLocationPermisionCard } from './components';
import { Devider, Header, SearchingBtn, Container, FutsalCards, BookedFutsalCards, ListHeader } from '../../../components';
import { Dimensions, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, Button, FlatList, Platform } from 'react-native';
//
const { width, height } = Dimensions.get('window');
//
const HomeScreen = ({ route }) => {
    //
    const { navigate } = useNavigation();
    const [locationPermision, setLocationPermision] = useState(true)
    const viewAll = () => {
        alert('View All')
    }
    //
    return (
        <SafeAreaView style={styles.mainContainer}  >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary_color} />
            <ScrollView stickyHeaderIndices={[0]} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <Header />
                    <Devider height={20} />
                    <Text>
                        Explore
                    </Text>
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider />
                    {
                        locationPermision == true ?
                            <Container title="Nearby Futsals" viewAll="View All" onViewAll={viewAll}>
                                <FlatList
                                    horizontal
                                    data={nearByFutsalsData}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.nearByFutsalsCardCon}
                                    renderItem={({ item }) => <NearByFutsalsCard {...item} />}
                                />
                            </Container>
                            :
                            <NearByLocationPermisionCard />
                    }
                    <Devider />
                    <FlatList
                        scrollEnabled={false}
                        data={nearByFutsalsData}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <FutsalCards {...item} />}
                        ListHeaderComponent={() => <ListHeader title="Popular Futsals" textButton="View All" />}
                    />
                    <Devider />
                    <Text>
                        Show More
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default HomeScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color
        ,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    scrollCon: {
        flex: 1,
        // paddingBottom: '15%'
    },
    head: {
        width: '100%',
        paddingBottom: '5%',
        zIndex: 0,
        padding: appLayout.padding,
        backgroundColor: COLORS.primary_color
    },
    body: {
        flex: 1,
        zIndex: 1000,
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: '0.3%',
        backgroundColor: COLORS.bg_tertiary
    },
    nearByFutsalsCardCon: {
        columnGap: 10,
        paddingHorizontal: appLayout.padding,
    },
    popularFutsalsCon: {
        rowGap: 20,
        paddingHorizontal: appLayout.paddingX
    },
    flatListCon: {
        rowGap: 20,
        paddingHorizontal: appLayout.paddingX
    }
})
//